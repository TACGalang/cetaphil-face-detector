import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const Home: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [smiling, setSmiling] = useState<boolean>(false);
	const [smilePercent, setSmilyPercent] = useState<string>("");

	useEffect(() => {
		// Load face-api models when the component mounts
		const loadModels = async () => {
			await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
			await faceapi.nets.faceExpressionNet.loadFromUri("/models");
			startVideo();
		};

		const startVideo = () => {
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then((stream) => {
					if (videoRef.current) {
						videoRef.current.srcObject = stream;
						videoRef.current.onloadedmetadata = () => {
							videoRef.current?.play();
						};
					}
				})
				.catch((err) => {
					console.error("Error accessing webcam: ", err);
					alert("Please allow webcam access to use this feature.");
				});
		};

		loadModels();
	}, []);

	const handleVideoPlay = () => {
		const detectSmile = async () => {
			if (videoRef.current) {
				const detections = await faceapi
					.detectAllFaces(
						videoRef.current,
						new faceapi.TinyFaceDetectorOptions()
					)
					.withFaceExpressions();

				console.log("TG>>> detections.length", detections);
				if (detections.length > 0) {
					const expressions = detections[0].expressions;
					setSmiling(expressions.happy > 0.6); // Threshold for detecting a smile
					setSmilyPercent(
						`happy: ${expressions.happy} sad: ${expressions.sad} angry:${expressions.angry}`
					);
				}
			}
		};

		// Continuously detect smile every 100ms while the video is playing
		const intervalId = setInterval(detectSmile, 100);

		return () => clearInterval(intervalId); // Cleanup interval on unmount
	};

	return (
		<div>
			{/* Video element for live webcam feed */}
			<video
				ref={videoRef}
				autoPlay
				muted
				playsInline
				onPlay={handleVideoPlay}
				style={{ width: "720px", height: "560px", backgroundColor: "black" }}
			/>
			<h2>{smiling ? "Smiling 😊" : "Not Smiling 😐"}</h2>
			<h3>{`${smilePercent}%`}</h3>
		</div>
	);
};

export default Home;
