import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import Camera from "../screens/camera";
import Start from "../screens/start";
import Instruction from "../screens/instructions";
import Error from "../screens/error";
import Result from "../screens/result";

import styles from "./styles.module.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Outlet />,
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <Start />,
			},
			{
				path: "instruction/",
				element: <Instruction />,
			},
			{
				path: "camera/",
				element: <Camera />,
			},
			{
				path: "result/:capturedImages",
				element: <Result />,
			},
		],
	},
]);

const Navigation = () => {
	const handle = useFullScreenHandle();

	return (
		<div
			className={styles.rootContainer}
			onDoubleClick={handle.active ? handle.exit : handle.enter}
		>
			<FullScreen handle={handle}>
				<RouterProvider router={router} />;
			</FullScreen>
		</div>
	);
};

export default Navigation;
