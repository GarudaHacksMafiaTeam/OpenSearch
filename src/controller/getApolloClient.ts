import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const getApolloClient = () => {
  const isLocalHost = process.env.NEXTAUTH_URL?.includes('localhost');
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `http${isLocalHost ? '' : 's'}://localhost:3000/api/graphql`,
      fetch,
    }),
  });
};

export default getApolloClient
