import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SearchBar from "material-ui-search-bar";

import TablePagination from '@mui/material/TablePagination';

import { gql, useQuery, useLazyQuery } from '@apollo/client';

// const GET_PEOPLE= gql`
// query allPeopleQuery($first: Int!){
//     allPeople(first: $first){
//     people {
//       id,
//       name,
//       birthYear,
//       gender,
//     species { name },
//        homeworld { name }
//     }
//     }
// }
// `;

const GET_NEXT_PEOPLE= gql`
query allPeopleQuery($first: Int!, $after: String!){
    allPeople(first: $first, after: $after){
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

const GET_PREVIOUS_PEOPLE= gql`
query allPeopleQuery($first: Int!, $before: String!){
    allPeople(first: $first, before:$before){
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

const GET_PEOPLE= gql`
query allPeopleQuery($first: Int!, $before: String!){
    allPeople(first: $first, before:$before){
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


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

var names = [];
names[0] = prompt("New member name?");
const addToFavourite=(id)=>{

const resultArray= localStorageItem()
if(resultArray){
    const found = resultArray.find(element => element === id);
    if(found){
        return found
    }
    else{
        resultArray.push(id)
        localStorage.setItem("names", resultArray);

    }

}
else{
    localStorage.setItem("names", []);
    return false
}
}
const localStorageItem=()=>localStorage.getItem("favourite")



export default function BasicTable(props) {

    const [searched, setSearched] = React.useState("");

        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);
        const [callQuery, setCallQuery] = React.useState(false);
        const [rows, setRows]=React.useState(props.data?.allPeople.people)
  
        const { loading, error, data} = useQuery(GET_PEOPLE,{
            variables: { first: rowsPerPage },
            skip: callQuery

          });  
          const requestSearch = (searchedVal) => {

            const filteredRows = rows.filter((row) => {
              return row.name.toLowerCase().includes(searchedVal.toLowerCase());
            });
            debugger
            setRows(filteredRows);
          };
        
          const cancelSearch = () => {
            setSearched("");
            setRows(props.data?.allPeople.people)
          };
          const handleChangePage = (event, newPage) => {
            setPage(newPage);
          };
        
          const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
          };
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>; 
          

  return (
    <>
    <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
    />
    {rows.length ===0 ? <h1>No record found</h1> : <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Birth Year</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Home World</TableCell>
            <TableCell align="right">Species</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.birthYear}</TableCell>
              <TableCell align="right">{row.homeworld?.name}</TableCell>
              <TableCell align="right">{row.species?.name}</TableCell>
              <Button variant="contained" onClick={(e)=>addToFavourite(e.target.id)}>{localStorageItem()?.includes(row.id)?"Added" : "AddtoFavourite"}</Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
    
    }
    </>
  );
}