import React from "react";

import styles from "./styles.module.css";

interface Props {
	children: React.ReactNode;
	hasOverlays: boolean;
}

const VideoFrame: React.FC<Props> = ({ children, hasOverlays }) => {
	return <div className={styles.rootContainer}>{children}</div>;
};

export default VideoFrame;
