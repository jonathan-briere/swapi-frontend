import { render, screen, waitFor, within } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_PEOPLE } from "graphql/queries";

import { StarWars } from "..";
import { sortAscending } from "helpers/sortHelper";
import { people } from "fixures/people";

const mocks = [
  {
    request: {
      query: GET_PEOPLE,
      variables: {
        first: 10,
      },
    },
    result: {
      data: {
        allPeople: {
          pageInfo: {
            startCursor: "YXJyYXljb25uZWN0aW9uOjA=",
            endCursor: "YXJyYXljb25uZWN0aW9uOjk=",
            __typename: "PageInfo",
          },
          people,
          __typename: "PeopleConnection",
        },
      },
    },
  },
];

it("renders without error", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <StarWars />
    </MockedProvider>
  );

  await waitFor(() => new Promise((res) => setTimeout(res, 0)));

  const sortedPeople = sortAscending(people);
  sortedPeople.forEach((person, index) => {
    const row = within(screen.getAllByRole("listitem")[index]);
    expect(row.getByText(person.name)).toBeInTheDocument();
    expect(row.getByText(person.birthYear)).toBeInTheDocument();
    expect(row.getByText(person.gender)).toBeInTheDocument();
    expect(row.getByText(person.homeworld?.name)).toBeInTheDocument();
  });
});
