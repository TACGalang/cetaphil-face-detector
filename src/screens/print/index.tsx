import { usePrint } from "./hooks";

import Button from "../../components/button";
import VideoFrame from "../../components/videoFrame";
import { animated } from "@react-spring/web";

import styles from "./style.module.css";
import NoButton from "../../assets/noButton.png";
import YestButton from "../../assets/yesButton.png";

const Print = () => {
	const { goHome, reactToPrintFn, contentRef, imageToPrint, printStyle } =
		usePrint();

	return (
		<div className={styles.background}>
			<h1 className={styles.headerText}>Would you like to print your photo?</h1>
			<animated.div ref={contentRef} style={printStyle}>
				<VideoFrame>
					<img src={imageToPrint} alt="photoimage" className={styles.photo} />
				</VideoFrame>
			</animated.div>
			<div className={styles.cta}>
				<Button source={NoButton} onPress={() => goHome()} />
				<Button source={YestButton} onPress={() => reactToPrintFn()} />
			</div>
		</div>
	);
};

export default Print;
