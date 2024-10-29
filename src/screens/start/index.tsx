import { useStart } from "./hooks";
import { animated } from "@react-spring/web";

import Button from "../../components/button";

import styles from "./styles.module.css";
import logo from "../../assets/logo.png";
import startButton from "../../assets/startButton.png";

const Start = () => {
	const { onStart, logoStyle } = useStart();

	return (
		<div className={styles.background}>
			<animated.div style={logoStyle} className={styles.contentContainer}>
				<img src={logo} alt="logo" className={styles.logo} />
				<Button source={startButton} onPress={() => onStart()} />
			</animated.div>
		</div>
	);
};

export default Start;