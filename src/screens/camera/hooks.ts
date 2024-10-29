import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useSpring } from "@react-spring/web";
import { useStore } from "../../stores";

export const useCamera = () => {
	const navigate = useNavigate();
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [capturedImages, setCapturedImage] = useState<string[]>([]);
	const [count, setCount] = useState(0);
	const { addImage } = useStore();

	const { staticWindowSize } = useWindowSize();

	useEffect(() => {
		if (capturedImages.length === 3) {
			videoRef.current?.pause();
			navigate("/result/");
		}
	}, [capturedImages, navigate]);

	const captureImage = () => {
		setCount(3);
	};

	const saveImage = () => {
		if (videoRef.current && canvasRef.current) {
			const context = canvasRef.current.getContext("2d");
			if (context) {
				// Set canvas size to match video size
				canvasRef.current.width = videoRef.current.videoWidth;
				canvasRef.current.height = videoRef.current.videoHeight;

				// Draw the current video frame onto the canvas
				context.drawImage(
					videoRef.current,
					0,
					0,
					canvasRef.current.width,
					canvasRef.current.height
				);

				// Convert the canvas content to a data URL (image URL)
				const imageUrl = canvasRef.current.toDataURL("image/png");
				const capturedImgs = [...capturedImages];
				capturedImgs.push(imageUrl);
				addImage(imageUrl);

				setCapturedImage(capturedImgs);
			}
		}
	};

	// Countdown logic
	useEffect(() => {
		if (count > 0) {
			const timer = setTimeout(() => {
				setCount(count - 1);
				saveImage();
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [count]);

	// Animate the scale and opacity
	const countdownStyle = useSpring({
		from: { opacity: 1, transform: "scale(1)" },
		to: async (next) => {
			while (count > 0) {
				await next({ opacity: 0, transform: "scale(0.5)" });
				await next({ opacity: 1, transform: "scale(1)" });
			}
		},
		reset: true,
		// reverse: count > 0,
		config: { duration: 1000 },
	});

	return {
		videoRef,
		canvasRef,
		captureImage,
		staticWindowSize,
		countdownStyle,
		count,
	};
};
