import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring } from "@react-spring/web";
import { useWindowSize } from "../../hooks/useWindowSize";

export const useStart = () => {
	const navigate = useNavigate();
	const { isMobileWidth } = useWindowSize();

	const onStart = () => {
		navigate("instruction/");
	};

	const logoStyle = useSpring({
		from: { opacity: 0, transform: "scale(1.2)" },
		to: { opacity: 1, transform: "scale(1)" },
		config: { duration: 1500, easing: (t) => t * (2 - t) },
	});

	return {
		onStart,
		logoStyle,
		isMobileWidth,
	};
};
