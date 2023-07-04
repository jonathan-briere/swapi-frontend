import { useCallback, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Paper, TableContainer, TablePagination } from "@mui/material";
import styled from "styled-components";
import SearchBar from "material-ui-search-bar";

import { PersonTable } from "components/PersonTable";
import {
  GET_NEXT_PEOPLE,
  GET_PEOPLE,
  GET_PEOPLE_COUNT,
  GET_PREVIOUS_PEOPLE,
} from "graphql/queries";

const SearchWrapper = styled.div`
  border: 1px black;
  margin: 2px 0px;
`;

export const Pagination = (props) => {
  const [isSearching, setSearching] = useState(false);
  const [response, setResponse] = useState({
    data: props.data,
    rows: props.data.allPeople.people,
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const people_count = useQuery(GET_PEOPLE_COUNT);
  const { data: allRows } = useQuery(GET_PEOPLE);

  const [getAllPeople] = useLazyQuery(GET_PEOPLE, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setResponse({
        data: data,
        rows: data.allPeople.people,
      });
    },
  });

  const [getNext] = useLazyQuery(GET_NEXT_PEOPLE, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setResponse({
        data: data,
        rows: data.allPeople.people,
      });
    },
  });

  const [getPrevious] = useLazyQuery(GET_PREVIOUS_PEOPLE, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setResponse({
        data: data,
        rows: data.allPeople.people,
      });
    },
  });

  const handleChangePage = useCallback(
    (event, newPage) => {
      if (page < newPage) {
        getNext({
          variables: {
            first: rowsPerPage,
            after: response.data.allPeople.pageInfo.endCursor,
          },
        });
      } else {
        getPrevious({
          variables: {
            last: rowsPerPage,
            before: response.data.allPeople.pageInfo.startCursor,
          },
        });
      }
      setPage(newPage);
    },
    [
      getNext,
      getPrevious,
      page,
      response.data.allPeople.pageInfo.endCursor,
      response.data.allPeople.pageInfo.startCursor,
      rowsPerPage,
    ]
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
      getAllPeople({
        variables: { first: event.target.value },
      });
    },
    [getAllPeople]
  );

  const cancelSearch = useCallback(() => {
    setSearching(false);
    setResponse({
      data: props.data,
      rows: props.data.allPeople.people,
    });
    setPage(0);
  }, [props.data]);

  const requestSearch = useCallback(
    (searchedVal) => {
      if (searchedVal) {
        setSearching(true);
        const filteredRows = allRows.allPeople.people.filter((row) => {
          return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setResponse({
          data: response.data,
          rows: filteredRows,
        });
      } else {
        cancelSearch();
      }
    },
    [allRows, cancelSearch, response.data]
  );

  if (response.rows)
    return (
      <>
        <SearchWrapper>
          <SearchBar
            placeholder="Search Starwars People"
            onChange={requestSearch}
            onCancelSearch={cancelSearch}
          />
        </SearchWrapper>
        <TableContainer component={Paper}>
          <PersonTable data={response.rows} />
          {!isSearching ? (
            <TablePagination
              component="div"
              count={people_count.data?.allPeople.totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          ) : null}
        </TableContainer>
      </>
    );
};
