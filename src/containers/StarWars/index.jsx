import { useQuery } from "@apollo/client";
import styled from "styled-components";

import StarWarsImage from "assets/images/starwars.png";
import { GET_PEOPLE } from "graphql/queries";
import { Pagination } from "./Pagination";

const Theme = styled.div`
  background-color: #686868;
  min-height: 100vh;
`;

const StarWarsImg = styled.div`
  text-align: center;
  margin: auto;
  margin-bottom: 20px;
  width: 203px;
  height: 88px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${StarWarsImage});
`;

const Wrapper = styled.div`
  margin: auto;
  padding: 1% 2%;
`;

export const StarWars = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE, {
    variables: { first: 10 },
  });

  if (loading) return <h1>Loading ...</h1>;
  if (error) return <h1>Error ...</h1>;
  if (data)
    return (
      <Theme>
        <Wrapper>
          <StarWarsImg />
          <Pagination data={data} />;
        </Wrapper>
      </Theme>
    );
};
