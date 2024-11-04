import { useResult } from "./hooks";
import { animated } from "@react-spring/web";

import Button from "../../components/button";

import styles from "./style.module.css";
import NextButton from "../../assets/nextButton.png";
import loadingImage from "../../assets/loading.png";
import HomeButton from "../../assets/home.png";

const Result = () => {
	const {
		loading,
		countdownStyle,
		count,
		totalScore,
		onNext,
		hasError,
		goBack,
	} = useResult();

	return (
		<div className={styles.background}>
			{totalScore ? (
				<div className={styles.scoreContainer}>
					<h1 className={styles.loadingText}>YOUR SCORE IS</h1>
					<h1 className={styles.score}>{totalScore}</h1>
					<Button source={NextButton} onPress={() => onNext()} />
				</div>
			) : hasError ? (
				<>
					<h1 className={styles.loadingText}>NO FACE DETECTED</h1>
					<h1 className={styles.loadingText} onClick={() => goBack()}>
						TRY IT AGAIN
					</h1>
				</>
			) : (
				<h1 className={styles.loadingText}>ANALYZING...</h1>
			)}

			{!loading && count > 0 && (
				<animated.h1 style={countdownStyle} className={styles.countText}>
					{count}
				</animated.h1>
			)}
			<img src={loadingImage} alt="loading" className={styles.loading} />
		</div>
	);
};

export default Result;
