import React, { useEffect, useRef, useState } from "react";
import { useCamera } from "./hooks";
import * as faceapi from "face-api.js";

import { animated } from "@react-spring/web";

import styles from "./styles.module.css";
import captureButton from "../../assets/capturepng.png";
import Button from "../../components/button";

const Camera: React.FC = () => {
	const {
		videoRef,
		canvasRef,
		captureImage,
		staticWindowSize,
		count,
		countdownStyle,
	} = useCamera();

	// const [smiling, setSmiling] = useState<boolean>(false);
	// const [smilePercent, setSmilyPercent] = useState<string>("");

	useEffect(() => {
		// Load face-api models when the component mounts
		// const loadModels = async () => {
		// 	await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
		// 	await faceapi.nets.faceExpressionNet.loadFromUri("/models");
		// 	startVideo();
		// };

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

		startVideo();

		// loadModels();
	}, []);

	// const handleVideoPlay = () => {
	// 	const detectSmile = async () => {
	// 		if (videoRef.current) {
	// 			const detections = await faceapi
	// 				.detectAllFaces(
	// 					videoRef.current,
	// 					new faceapi.TinyFaceDetectorOptions()
	// 				)
	// 				.withFaceExpressions();

	// 			console.log("TG>>> detections.length", detections);
	// 			if (detections.length > 0) {
	// 				const expressions = detections[0].expressions;
	// 				setSmiling(expressions.happy > 0.6); // Threshold for detecting a smile
	// 				setSmilyPercent(
	// 					`happy: ${expressions.happy} sad: ${expressions.sad} angry:${expressions.angry}`
	// 				);
	// 			}
	// 		}
	// 	};

	// 	// Continuously detect smile every 100ms while the video is playing
	// 	const intervalId = setInterval(detectSmile, 100);

	// 	return () => clearInterval(intervalId); // Cleanup interval on unmount
	// };

	return (
		<div className={styles.background}>
			<video
				ref={videoRef}
				autoPlay
				muted
				playsInline
				width={
					staticWindowSize.current ? staticWindowSize.current.width / 2 : 640
				}
				height={
					staticWindowSize.current ? staticWindowSize.current.height / 2 : 480
				}
				className={styles.videoContainer}
			/>
			<canvas ref={canvasRef} style={{ display: "none" }} />
			<Button source={captureButton} onPress={() => captureImage()} />
			{count > 0 && (
				<div className={styles.countDownContainer}>
					<animated.h1 style={countdownStyle} className={styles.countDownText}>
						{count > 0 ? count : "Smile!"}
					</animated.h1>
				</div>
			)}
		</div>
	);
};

export default Camera;