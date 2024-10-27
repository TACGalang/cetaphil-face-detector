import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Home from "../screens/home";
import Error from "../screens/error";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Outlet />,
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
		],
	},
]);

const Navigation = () => {
	return <RouterProvider router={router} />;
};

export default Navigation;
