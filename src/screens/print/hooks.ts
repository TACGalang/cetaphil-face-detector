import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useStore } from "../../stores";
import { useSpring } from "@react-spring/web";

export const usePrint = () => {
	const navigate = useNavigate();
	const contentRef = useRef<HTMLDivElement>(null);
	const [finishPrinting, setFinishPrinting] = useState<boolean>(false);
	const reactToPrintFn = useReactToPrint({
		contentRef,
		onAfterPrint: () => setFinishPrinting(true),
	});
	const { images, clearImages } = useStore();

	const imageToPrint = useMemo(() => {
		return images.length > 0 ? images[images.length - 1] : undefined;
	}, [images]);

	const goHome = () => {
		clearImages();
		navigate("/");
	};

	const print = () => {
		reactToPrintFn();
	};

	const printStyle = useSpring({
		from: { opacity: 0, transform: "scale(1.2)" },
		to: { opacity: 1, transform: "scale(1)" },
		config: { duration: 1500, easing: (t) => t * (2 - t) },
	});

	return {
		goHome,
		contentRef,
		imageToPrint,
		printStyle,
		print,
		finishPrinting,
	};
};
