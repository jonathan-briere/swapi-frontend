import React from 'react'
import { gql, useQuery } from '@apollo/client';
import Component2 from "./Component2"
const GET_PEOPLE= gql`
query allPeopleQuery($first: Int!){
    allPeople(first: $first){
    people {
      id,
      name,
      birthYear,
      gender,
    species { name },
       homeworld { name }
    }
    }
}
`;

export default function Component3() {
    const { loading, error, data} = useQuery(GET_PEOPLE,{
        variables: { first: 10 },

    });
    if(loading)return<h1>Loading ...</h1>
    if(error)return<h1>Error ...</h1>
    if(data)return (
        <div>
            <Component2 data={data}/>
        </div>
    )
    
}
