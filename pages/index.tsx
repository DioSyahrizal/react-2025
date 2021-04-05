import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { Button } from '@chakra-ui/button';
import { Box, Heading, Text } from '@chakra-ui/layout';

import { useAuth } from '~/lib/auth';
import { Logo } from '~/styles/icons';

const Home: NextPage = () => {
  const auth = useAuth();
  return (
    <div className="container">
      <Head>
        <title>Fast Feedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        display="flex"
        height="100vh"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Heading fontWeight="normal">Fast Feedback</Heading>
        <Logo color="black" name="logo" w={32} h={32} />
        <Text>
          Current User: <code>{auth?.user?.name}</code>
        </Text>
        {auth.user ? (
          <>
            <Button onClick={() => auth.signout()}>Sign Out</Button>
          </>
        ) : (
          <Button onClick={() => auth.signinWithGithub()}>Sign in</Button>
        )}
        <div>{auth?.user?.email}</div>
      </Box>
    </div>
  );
};

export default Home;
