import { useNavigate } from "react-router-dom";
import Button from "../../components/button";

import styles from "./styles.module.css";
import HomeButton from "../../assets/home.png";

const Error = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.background}>
			<h1 className={styles.text}>
				Something went wrong <br /> please try again
			</h1>
			<Button source={HomeButton} onPress={() => navigate("/")} />
		</div>
	);
};

export default Error;
