import { useStart } from "./hooks";
import { animated } from "@react-spring/web";

import Button from "../../components/button";

import styles from "./styles.module.css";
import logo from "../../assets/logo.png";
import startButton from "../../assets/startButton.png";

const Start = () => {
	const { onStart, logoStyle, isMobileWidth } = useStart();

	return (
		<div className={styles.background}>
			{isMobileWidth ? (
				<div className={styles.prompt}>
					<h1 className={styles.promptText}>Please use a wider screen</h1>
				</div>
			) : (
				<animated.div style={logoStyle} className={styles.contentContainer}>
					<img src={logo} alt="logo" className={styles.logo} />
					<Button source={startButton} isLarge onPress={() => onStart()} />
				</animated.div>
			)}
		</div>
	);
};

export default Start;
