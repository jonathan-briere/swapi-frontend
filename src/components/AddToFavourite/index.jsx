import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const AddToFavourite = ({id}) => {
  const [favourite, setFavourite] = useState(null);

  const localStorageItem = () => localStorage.getItem("favourites");

  const addToFavourite = useCallback(
    () => {
      var resultArray = localStorageItem()?.split(",");

      if (resultArray === undefined) {
        localStorage.setItem("favourites", []);
        resultArray = [];
      }

      const found = resultArray.indexOf(id);
      if (found !== -1) {
        resultArray.splice(found, 1);
        localStorage.setItem("favourites", resultArray);
      } else {
        resultArray.push(id);
        localStorage.setItem("favourites", resultArray);
      }

      favourite ? setFavourite(false) : setFavourite(true);
    },
    [favourite, id]
  );

  return (
    <Button variant="text" onClick={(e) => addToFavourite()}>
      {localStorageItem()?.includes(id) ? (
        <FavoriteIcon sx={{ color: "red" }} />
      ) : (
        <FavoriteBorderIcon color="disabled" />
      )}
    </Button>
  );
};
