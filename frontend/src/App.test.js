import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./api", () => ({
  addFavorite: jest.fn(),
  createComment: jest.fn(),
  createRecipe: jest.fn(),
  deleteComment: jest.fn(),
  deleteRecipe: jest.fn(),
  getComments: jest.fn(() => Promise.resolve({ data: [] })),
  getCurrentUser: jest.fn(() => Promise.resolve({ data: { id: 1, username: "chef", role: "user" } })),
  getFavorites: jest.fn(() => Promise.resolve({ data: [] })),
  getRecipes: jest.fn(() => Promise.resolve({ data: [] })),
  likeComment: jest.fn(),
  loginUser: jest.fn(),
  rateRecipe: jest.fn(),
  registerUser: jest.fn(),
  removeFavorite: jest.fn(),
  setAuthToken: jest.fn(),
  unlikeComment: jest.fn(),
  updateComment: jest.fn(),
  updateRecipe: jest.fn(),
}));

beforeEach(() => {
  window.localStorage.clear();
});

test("renders the separate login page by default", () => {
  render(<App />);

  expect(screen.getByText(/CulinaryCanvas/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Log in/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Create a new account/i })).toBeInTheDocument();
});
