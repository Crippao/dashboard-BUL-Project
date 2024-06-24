import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NationalView from "./pages/NationalView";
import ItalyMap from "./pages/ItalyMap";
import RegionalView from "./pages/RegionalView";
import Home from "./pages/Home";

export const router = createBrowserRouter([
    {
        path: "/*",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
                index: true
            },
            {
                path: "national",
                element: <NationalView />,
                // index: true
            },
            {
                path: "regional",
                element: <RegionalView />,
            },
            {
                path: "italy",
                element: <ItalyMap />,
            },
        ],
    },
]);
