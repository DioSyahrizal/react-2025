import { ChakraProvider, css } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { ProviderAuth } from '~/lib/auth';
import theme from '~/styles/theme';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ProviderAuth>
      <ChakraProvider theme={theme}>
        <Global
          styles={css`
            html {
              scroll-behavior: smooth;
            }

            #__next {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
            }
          `}
        />
        <Component {...pageProps} />
      </ChakraProvider>
    </ProviderAuth>
  );
}

export default MyApp;
