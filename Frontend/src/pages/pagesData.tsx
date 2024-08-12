import { routerType } from "../types/router.types";
import About from "./About/About";
import ColorSystem from "./ColorSystem/ColorSystem";
import Home from "./Home/Home";
import UniversalConverter from "./UniversalConverter/UniversalConverter"

const pagesData: routerType[] = [
    {
        path: "Home",
        element: <Home />,
        title: "Home",
    },
    {
        path: "ColorSystem",
        element: <ColorSystem />,
        title: "Color System"
    },
    {
        path: "About",
        element: <About />,
        title: "about"
    },
    {
        path: "UniversalConverter",
        element: <UniversalConverter />,
        title: "Universal Converter"
    }
];

export default pagesData;