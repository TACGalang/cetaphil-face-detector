import { useNavigate } from "react-router-dom";

export const usePrint = () => {
	const navigate = useNavigate();

	const goHome = () => {
		navigate("/");
	};

	return {
		goHome,
	};
};
