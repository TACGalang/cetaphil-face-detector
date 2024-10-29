import { useParams } from "react-router-dom";

import styles from "./style.module.css";
import loadingImage from "../../assets/loading.png";

const Result = () => {
	const { capturedImages } = useParams();
	console.log("TG>>> captured", capturedImages);

	return (
		<div className={styles.background}>
			<h1 className={styles.loadingText}>ANALYZING...</h1>
			<img src={loadingImage} alt="loading" className={styles.loading} />
		</div>
	);
};

export default Result;
