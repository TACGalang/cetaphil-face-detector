import { usePrint } from "./hooks";

import Button from "../../components/button";
import VideoFrame from "../../components/videoFrame";

import styles from "./style.module.css";
import NoButton from "../../assets/noButton.png";
import YestButton from "../../assets/yesButton.png";

const Print = () => {
	const { goHome } = usePrint();

	return (
		<div className={styles.background}>
			<VideoFrame hasOverlays>
				<img alt="photoimage" className={styles.photo} />
			</VideoFrame>
			<div className={styles.cta}>
				<Button source={NoButton} onPress={() => goHome()} />
				<Button source={YestButton} onPress={() => {}} />
			</div>
		</div>
	);
};

export default Print;
