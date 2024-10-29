import React from "react";

import styles from "./styles.module.css";

interface Props {
	source: string | undefined;
	onPress: () => void;
}

const Button: React.FC<Props> = ({ source, onPress }) => {
	return (
		<div className={styles.buttonContainer} onClick={() => onPress()}>
			<img src={source} alt="button" className={styles.buttonImage} />
		</div>
	);
};

export default Button;
