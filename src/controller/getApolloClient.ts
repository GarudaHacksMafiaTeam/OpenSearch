import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const getApolloClient = () => {
  const isLocalHost = process.env.NEXTAUTH_URL?.includes('localhost');
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${isLocalHost ? 'http://localhost:3000/api/graphql' : 'https://open-search.vercel.app'}`,
      fetch,
    }),
  });
};

export default getApolloClient
