"use client";

import React from 'react';
import { CMSProvider } from '../../cms/context/CMSContext';
import CMSApp from '../../cms/CMSApp';

const CMSPage = () => {
  return (
    <CMSProvider>
      <CMSApp />
    </CMSProvider>
  );
};

export default CMSPage;


