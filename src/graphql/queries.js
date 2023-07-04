import gql from "graphql-tag";

export const GET_PEOPLE = gql`query Person($first: Int) {
  allPeople(first: $first) {
    pageInfo {
      startCursor
      endCursor
    }
    people {
      id
      name
      birthYear
      gender
      species {
        name
      }
      homeworld {
        name
      }
    }
  }
}
`;

export const GET_NEXT_PEOPLE = gql`query Person($first: Int, $after: String) {
  allPeople(first: $first, after: $after) {
    pageInfo {
      startCursor
      endCursor
    }
    people {
      id
      name
      birthYear
      gender
      species {
        name
      }
      homeworld {
        name
      }
    }
  }
}
`;

export const GET_PREVIOUS_PEOPLE = gql`query AllPeople($last: Int, $before: String) {
  allPeople(last: $last, before: $before) {
    pageInfo {
      startCursor
      endCursor
    }
    people {
      id
      name
      birthYear
      gender
      species {
        name
      }
      homeworld {
        name
      }
    }
  }
}
`;

export const GET_PEOPLE_COUNT = gql`
  query AllPeople {
    allPeople {
      totalCount
    }
  }
`;
