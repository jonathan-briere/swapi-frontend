import { useCallback, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { TableHead } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { AddToFavourite } from "components/AddToFavourite";
import { sortAscending, sortDescending } from "helpers/sortHelper";

export const localStorageItem = () => localStorage.getItem("favourites");

export const PersonTable = ({ data }) => {
  const [sortData, setSortData] = useState({
    ascending: false,
    data: sortAscending(data),
  });

  useEffect(() => {
    setSortData({
      ascending: false,
      data: sortAscending(data),
    });
  }, [data]);

  const sortHandler = useCallback(() => {
    if (sortData.ascending)
      setSortData({
        ascending: false,
        data: sortAscending(data),
      });
    else {
      setSortData({
        ascending: true,
        data: sortDescending(data),
      });
    }
  }, [data, sortData.ascending]);

  return (
    <>
      {sortData.data.length === 0 ? (
        <h1>No record found</h1>
      ) : (
        <>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Name</b>
                  <Button onClick={sortHandler}>
                    {sortData.ascending ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <b>Birth Year</b>
                </TableCell>
                <TableCell align="right">
                  <b>Gender</b>
                </TableCell>
                <TableCell align="right">
                  <b>Home World</b>
                </TableCell>
                <TableCell align="right">
                  <b>Species</b>
                </TableCell>
                <TableCell align="right">
                  <b>Favourite</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortData.data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  role="listitem"
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.birthYear}</TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  <TableCell align="right">{row.homeworld?.name}</TableCell>
                  <TableCell align="right">{row.species?.name}</TableCell>
                  <TableCell align="right">
                    <AddToFavourite id={row.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
};
