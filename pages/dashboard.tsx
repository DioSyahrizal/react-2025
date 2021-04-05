import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

import { useAuth } from '~/lib/auth';

const EmptyState = dynamic(() => import('~/components/EmptyState'));

const Dashboard: NextPage = () => {
  const auth = useAuth();
  if (!auth.user) {
    return <p>Loading ...</p>;
  }
  return <EmptyState />;
};

export default Dashboard;
