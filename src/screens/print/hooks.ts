import { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useStore } from "../../stores";
import { useSpring } from "@react-spring/web";

export const usePrint = () => {
	const navigate = useNavigate();
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({ contentRef });
	const { images } = useStore();

	const imageToPrint = useMemo(() => {
		return images.length > 0 ? images[images.length - 1] : undefined;
	}, [images]);

	const goHome = () => {
		navigate("/");
	};

	const printStyle = useSpring({
		from: { opacity: 0, transform: "scale(1.2)" },
		to: { opacity: 1, transform: "scale(1)" },
		config: { duration: 1500, easing: (t) => t * (2 - t) },
	});

	return {
		goHome,
		contentRef,
		reactToPrintFn,
		imageToPrint,
		printStyle,
	};
};