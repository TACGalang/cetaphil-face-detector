import { usePrint } from "./hooks";

import Button from "../../components/button";
import VideoFrame from "../../components/videoFrame";
import { animated } from "@react-spring/web";

import styles from "./style.module.css";
import NoButton from "../../assets/noButton.png";
import YestButton from "../../assets/yesButton.png";
import HomeButton from "../../assets/home.png";
import PhotoFrame from "../../assets/photoFrame.png";
import { url } from "inspector";

const Print = () => {
	const {
		goHome,
		print,
		contentRef,
		imageToPrint,
		printStyle,
		finishPrinting,
	} = usePrint();

	return (
		<div className={styles.background}>
			<h1 className={styles.headerText}>Would you like to print your photo?</h1>
			<animated.div ref={contentRef} style={printStyle}>
				<div
					style={{
						backgroundImage: `url(${imageToPrint})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						width: "26rem",
						height: "37rem",
					}}
				>
					<img
						src={PhotoFrame}
						alt="image-frame"
						className={styles.photoCover}
					/>
				</div>
			</animated.div>
			<div className={styles.cta}>
				<Button
					source={finishPrinting ? HomeButton : NoButton}
					onPress={() => goHome()}
				/>

				<Button source={YestButton} onPress={() => print()} />
			</div>
		</div>
	);
};

export default Print;
