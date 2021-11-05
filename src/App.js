import './App.css';
import React, {useEffect, useState} from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink,
  split
} from "@apollo/client";
// import ApolloClient from "apollo-client";
import { WebSocketLink } from 'apollo-link-ws';
// import { HttpLink } from 'apollo-link-http';
// import { split } from 'apollo-link';
import { getMainDefinition } from '@apollo/client/utilities';
// import { InMemoryCache } from 'apollo-cache-inmemory';

import { useAuth0 } from "@auth0/auth0-react";
import MyRouter from './router';


const App = () => {

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [token, setToken]= useState(null)

  useEffect(()=>{
    header();
  },[token]);
  

  const header= async ()=>{
    if(isAuthenticated){
    console.log('token called')
    const tokenRaw = await getAccessTokenSilently();
    if (tokenRaw) {
      console.log(tokenRaw);
      setToken(tokenRaw)
      // return { Authorization: `Bearer ${token}` }
    } else {
      console.log('no token found');
      // return {"X-Hasura-Role" : "anonymous"}
    }
  }
  }




  const httpLink = new HttpLink({
    uri: "https://recipies.hasura.app/v1/graphql", // use https for secure endpoint
    headers: header()
  }); 

  // const wsLink = new WebSocketLink({
  //   uri: "ws:///recipies.hasura.app/v1/graphql", // use wss for a secure endpoint
  //   options: {
  //     reconnect: true
  //   }
  // });

  // const link = split(
  //   // split based on operation type
  //   ({ query }) => {
  //     const { kind, operation } = getMainDefinition(query);
  //     return kind === 'OperationDefinition' && operation === 'subscription';
  //   },
  //   wsLink,
  //   httpLink,
  // );

  
    const headerss=token?({
      Authorization: `Bearer ${token}`
    }):(
   {
      "X-Hasura-Role" : "anonymous"
    });

    console.log(headerss)

  const client = new ApolloClient({
    uri: "https://recipies.hasura.app/v1/graphql",
    cache: new InMemoryCache(),
    headers: headerss
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <MyRouter />
      </div>
    </ApolloProvider>

  );
}

export default App;
