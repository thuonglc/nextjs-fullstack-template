import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ApolloProvider } from '@apollo/client';
import { createEmotionCache, theme } from '../utils';
import { appWithTranslation } from 'next-i18next';
import { useApollo } from '../lib/graphql';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  session?: any;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const apolloClient = useApollo(pageProps);

  return (
    <CacheProvider value={emotionCache}>
      <ApolloProvider client={apolloClient}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </CacheProvider>
  );
};

export default appWithTranslation(MyApp /*, nextI18NextConfig */);
