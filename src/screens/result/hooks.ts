import { useEffect, useMemo, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useSpring } from "@react-spring/web";
import { useStore } from "../../stores";

export const useResult = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [count, setCount] = useState(0);
	const { images } = useStore();
	const [scores, setScores] = useState<number[]>([]);

	const totalScore = useMemo(() => {
		console.log("TG>>> count, ", count);
		console.log("TG>>> scores.le", scores);
		if (scores.length > 0 && count <= 0) {
			const sum = scores.reduce((acc, num) => acc + num, 0);
			const total = sum / scores.length;
			return total < 0.5 ? "50" : `${(total * 100).toFixed(2)}`;
		} else {
			return undefined;
		}
	}, [scores, count]);

	useEffect(() => {
		loadModels();
	}, []);

	useEffect(() => {
		if (count > 0) {
			const timer = setTimeout(() => {
				setCount(count - 1);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [count]);

	const loadModels = async () => {
		setLoading(true);
		await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
		await faceapi.nets.faceExpressionNet.loadFromUri("/models");
		await detectSmile();
		setTimeout(() => {
			setLoading(false);
			setCount(5);
		}, 1000);
	};

	const countdownStyle = useSpring({
		from: { opacity: 1, transform: "scale(1)" },
		to: async (next) => {
			while (count > 0) {
				await next({ opacity: 0, transform: "scale(0.5)" });
				await next({ opacity: 1, transform: "scale(1)" });
			}
		},
		reset: true,
		config: { duration: 1000 },
	});

	const detectSmile = async () => {
		try {
			images.forEach(async (img) => {
				const image = new Image();
				image.src = img;
				const detections = await faceapi
					.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())
					.withFaceExpressions();

				const happyFaces = detections.map((face) =>
					face.expressions.happy <= 1 ? face.expressions.happy : 0.5
				);

				setScores((currentScore) => [...currentScore, ...happyFaces]);
			});
		} catch (error) {
			console.log("TG>>> error", error);
		}
	};

	return {
		loading,
		count,
		countdownStyle,
		totalScore,
	};
};