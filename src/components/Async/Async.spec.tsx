import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { Async } from ".";

test("it renders correctly", async () => {
  render(<Async />);

  expect(screen.getByText("Hello world!")).toBeInTheDocument();

  // ! OPÇÃO 1
  // expect(await screen.findByRole("button", {
  //   name: "button",
  // })).toBeInTheDocument()

  // ! OPÇÃO 2
//   await waitFor(() => {
//     return expect(
//       screen.getByRole("button", {
//         name: "button",
//       })
//     ).toBeInTheDocument();
//   });

    // ! OPÇÃO 3
    // await waitForElementToBeRemoved(screen.queryByText('Button'));
});
