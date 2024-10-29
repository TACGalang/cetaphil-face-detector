import React, { useState, useEffect, useMemo, useRef } from "react";

export interface windowSize {
	width: number;
	height: number;
}

const getWindowSize = (): windowSize => {
	const { innerWidth, innerHeight } = window;
	return { width: innerWidth, height: innerHeight };
};

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState<windowSize>(getWindowSize());
	const staticWindowSize = useRef<windowSize>();

	useEffect(() => {
		const handleWindowResize = () => {
			staticWindowSize.current = getWindowSize();
			setWindowSize(getWindowSize());
		};

		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	const isMobileWidth = useMemo(() => {
		return windowSize.width < 1024;
	}, [windowSize]);

	return {
		isMobileWidth,
		windowSize,
		staticWindowSize,
	};
};
