import React from 'react'
import { Provider } from 'next-auth/client'
import { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { NotificationProvider } from 'context/notification'
import { OpenSourceProvider } from 'context/opensource'
import Layout from 'components/layout/index'
import '../styles/global.css'
import Head from 'next/head'
import NextNProgress from "nextjs-progressbar";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "/api/graphql",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>OpenSearch</title>
        <link rel="shortcut icon" href="assets/favicon.ico" />
        <meta name="description" content="Create, Search, and Manage your Open Source Project" />
        <meta name="keywords" content="opensource, project" />
      </Head>
      <Provider session={pageProps.session}>
        <ApolloProvider client={apolloClient}>
          <NotificationProvider>
            <OpenSourceProvider>
              <Layout >
                <NextNProgress height={6} />
                <Component {...pageProps} />
              </Layout>
            </OpenSourceProvider>
          </NotificationProvider>
        </ApolloProvider>
      </Provider>
    </>
  )
}

