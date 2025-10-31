import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Privacy Policy Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title and Last Updated */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: April 05, 2024
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {/* Collecting Personal Information Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Collecting Personal Information
              </h2>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>There are many variations of passages of Lorem Ipsum available.</li>
                <li>Iusto odio dignissimos ducimus qui blanditiis.</li>
                <li>Praesentium voluptatum deleniti atque.</li>
                <li>Quas molestias excepturi sint occaecati.</li>
              </ul>

              <p className="text-gray-700 leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>
            </div>

            {/* Sharing Personal Information Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Sharing Personal Information
              </h2>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
              </p>

              <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700">
                <li>Sometimes on purpose.</li>
                <li>Classical Latin literature from 45 BC.</li>
                <li>The Extremes of Good and Evil.</li>
                <li>This book is a treatise on the theory.</li>
              </ol>

              <p className="text-gray-700 leading-relaxed">
                Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>

            {/* Additional Privacy Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Data Protection and Security
              </h2>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our security measures include encryption, secure servers, and regular security audits.
              </p>

              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at example@gmail.com or through our contact page. We are committed to protecting your privacy and will respond to your inquiries promptly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;

