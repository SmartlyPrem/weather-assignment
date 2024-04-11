import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import Listing from "./pages/Listing";
import Weather from "./pages/Weather";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Listing />
    },
    {
      path: "/weather",
      element: <Weather />
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
