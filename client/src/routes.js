import CreateQuote from "./components/CreateQuote";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import OtherUserProfile from "./components/OtherUserProfile";
import NotFound from "./components/NotFound";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/create", element: <CreateQuote /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/profile", element: <Profile /> },
  { path: "/profile/:userid", element: <OtherUserProfile /> },
  { path: "*", element: <NotFound /> }
];
