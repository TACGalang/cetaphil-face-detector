import { useEffect, useMemo, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useSpring } from "@react-spring/web";
import { useStore } from "../../stores";
import { useNavigate } from "react-router-dom";

export const useResult = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const [count, setCount] = useState(0);
	const { images } = useStore();
	const [scores, setScores] = useState<number[]>([]);
	const [finishCounting, setFinishCounting] = useState<boolean>(false);
	const [hasError, setError] = useState<boolean>(false);

	const totalScore = useMemo(() => {
		if (scores.length > 0 && count <= 0 && finishCounting) {
			const sum = scores.reduce((acc, num) => acc + num, 0);
			const total = sum / scores.length;
			return total < 0.5 ? "50" : `${(total * 100).toFixed()}`;
		} else {
			return undefined;
		}
	}, [scores, count, finishCounting]);

	useEffect(() => {
		loadModels();
	}, []);

	useEffect(() => {
		if (count > 0) {
			const timer = setTimeout(() => {
				if (count <= 3) {
					setFinishCounting(true);
				}
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
			const facesScore: number[] = [];
			images.forEach(async (img) => {
				const image = new Image();
				image.src = img;
				const detections = await faceapi
					.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())
					.withFaceExpressions();

				const happyFaces = detections.map((face) =>
					face.expressions.happy <= 1 ? face.expressions.happy : 0.5
				);

				facesScore.push(...happyFaces);
			});

			if (facesScore.length > 0) {
				setScores((currentScore) => [...currentScore, ...facesScore]);
			} else {
				setError(true);
			}
		} catch (error) {
			console.log("TG>>> error", error);
		}
	};

	const onNext = () => {
		navigate("/print/");
	};

	const goBack = () => {
		navigate(-1);
	};

	return {
		loading,
		count,
		countdownStyle,
		totalScore,
		onNext,
		hasError,
		goBack,
	};
};
