import React from "react";

import styles from "./styles.module.css";
import OverLays from "../../assets/overlay3.png";
import Overlay1 from "../../assets/overlay1.png";
import Overlay2 from "../../assets/overlay2.png";

interface Props {
	children: React.ReactNode;
	ref?: React.RefObject<HTMLDivElement>;
}

const VideoFrame: React.FC<Props> = ({ children, ref }) => {
	return (
		<div className={styles.rootContainer} ref={ref}>
			<div className={styles.childContainer}>{children}</div>
			<div className={styles.topDiv}>
				<img src={Overlay1} alt="overlays" className={styles.overlay1} />
			</div>
			{/* <div className={styles.childContainer}>{children}</div> */}
			<div className={styles.bottomDiv}>
				<div className={styles.centerDiv}>
					<img src={Overlay2} alt="overlays" className={styles.overlay1} />
				</div>
				<img src={OverLays} alt="overlays" className={styles.overlays} />
			</div>
		</div>
	);
};

export default VideoFrame;
