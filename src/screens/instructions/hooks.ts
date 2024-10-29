import { useNavigate } from "react-router-dom";
import { useSpring } from "@react-spring/web";

export const useInstruction = () => {
	const navigate = useNavigate();

	const onStart = () => {
		navigate("/camera/");
	};

	const logoStyle = useSpring({
		from: { opacity: 0, transform: "scale(1.2)" },
		to: { opacity: 1, transform: "scale(1)" },
		config: { duration: 1500, easing: (t) => t * (2 - t) },
	});

	return {
		onStart,
		logoStyle,
	};
};
