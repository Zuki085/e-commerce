import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/config/firebase';
import {
	doc,
	getDoc,
	setDoc,
	addDoc,
	collection,
	serverTimestamp,
} from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2023-10-16',
});

export async function POST(req) {
	try {
		const { paymentMethodId, subtotal, items, userId, email, name } =
			await req.json();

		if (!paymentMethodId || !userId || !subtotal) {
			throw new Error('Missing required parameters');
		}

		// 1. Get or create Stripe customer
		const userRef = doc(db, 'users', userId);
		const userSnap = await getDoc(userRef);
		let customerId = userSnap.exists() ? userSnap.data().customerId : null;

		if (!customerId) {
			const customer = await stripe.customers.create({
				name,
				email,
			});
			customerId = customer.id;
			await setDoc(userRef, { customerId }, { merge: true });
		}

		// 2. Attach payment method (if not already attached)
		await stripe.paymentMethods.attach(paymentMethodId, {
			customer: customerId,
		});

		await stripe.customers.update(customerId, {
			invoice_settings: { default_payment_method: paymentMethodId },
		});

		// 3. Create & confirm PaymentIntent (only card, no redirects)
		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.round(subtotal * 100), // cents
			currency: 'usd',
			customer: customerId,
			payment_method: paymentMethodId,
			confirm: true,
			automatic_payment_methods: {
				enabled: true,
				allow_redirects: 'never',
			},
			receipt_email: email,
			description: `Cart purchase (${items.length} items)`,
			metadata: {
				userId,
				type: 'cart',
			},
		});

		// 4. Save order in Firestore (global `orders` collection)
		await addDoc(collection(db, 'orders'), {
			userId,
			amount: subtotal,
			status: paymentIntent.status,
			paymentIntentId: paymentIntent.id,
			items,
			createdAt: serverTimestamp(),
		});

		return NextResponse.json({
			success: true,
			paymentIntent,
		});
	} catch (error) {
		console.error('Payment error:', error);
		return NextResponse.json(
			{ success: false, error: error.message },
			{ status: 400 }
		);
	}
}
