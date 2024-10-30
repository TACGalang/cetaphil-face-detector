import React from "react";

import styles from "./styles.module.css";

interface Props {
	source: string | undefined;
	onPress: () => void;
	isLarge?: boolean;
}

const Button: React.FC<Props> = ({ source, onPress, isLarge }) => {
	return (
		<div
			className={isLarge ? styles.buttonContainerLarge : styles.buttonContainer}
			onClick={() => onPress()}
		>
			<img src={source} alt="button" className={styles.buttonImage} />
		</div>
	);
};

export default Button;
