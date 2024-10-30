import { useInstruction } from "./hooks";
import { animated } from "@react-spring/web";

import Button from "../../components/button";

import styles from "./styles.module.css";
import logo from "../../assets/logo.png";
import nextButton from "../../assets/nextButton.png";

const Instruction = () => {
	const { onStart, logoStyle } = useInstruction();

	return (
		<div className={styles.background}>
			<animated.div style={logoStyle} className={styles.contentContainer}>
				<h1 className={styles.header}>Let's take your photo</h1>

				<Button source={nextButton} onPress={() => onStart()} />
			</animated.div>
		</div>
	);
};

export default Instruction;
