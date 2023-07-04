import { render, screen, fireEvent } from "@testing-library/react";

import { AddToFavourite } from "..";

const id = 1;

it("renders without error", async () => {
  render(<AddToFavourite id={id} />);

  expect(screen.getByTestId("FavoriteBorderIcon")).toBeInTheDocument();
  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(screen.getByTestId("FavoriteIcon")).toBeInTheDocument();
});
