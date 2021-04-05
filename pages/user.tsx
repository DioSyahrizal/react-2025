import axios from 'axios';
import { GetStaticProps, NextPage } from 'next';
import React from 'react';

interface UserProps {
  users: string;
  error: boolean;
}

const fetchData = async () =>
  axios
    .get('http://localhost:3000/api/hello')
    .then((res) => ({
      error: false,
      users: res.data.name
    }))
    .catch(() => ({
      error: true,
      users: null
    }));

const User: NextPage<UserProps> = ({ users, error }) => {
  return <div>{!error && users}</div>;
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchData();
  return {
    props: data
  };
};

export default User;
