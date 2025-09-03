// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ImageBox from "../ImageBox/ImageBox";
import styles from "./BackgroundImage.module.css";
import { useInView } from "framer-motion";
import { useRef } from "react";
function BackgroundImage({
    image = "Landing/1",
    fileExtension = "jpg",
    className = "",
    initial = {},
    animate = {},
    transition = { duration: 1, ease: "easeOut" },
    exit = {},
    ref = undefined,
    objectFit = "cover",
    backgroundFilter = "none",
    objectPosition = "50% 20%",
    style = undefined,
    brightnessLevel = 0.5,
    blurPixels = 20,
    onAnimationStart = () => {},
    onAnimationComplete = () => {},
}) {
    const backgroundRef = useRef(null);
    const backgroundInView = useInView(backgroundRef, {
        once: true,
        amount: 0.5,
    });
    const mainStyles = {
        "--brightness-level": brightnessLevel,
        "--blur": `${blurPixels}px`,
        ...style,
    };

    return (
        <motion.div
            className={`${styles["background-wrapper"]}  ${className}`}
            style={mainStyles}
            ref={ref ?? backgroundRef}
        >
            <motion.div
                className={styles["background"]}
                initial={initial}
                animate={backgroundInView ? animate : undefined}
                onAnimationStart={onAnimationStart}
                onAnimationComplete={onAnimationComplete}
                transition={transition}
                exit={exit}
            >
                <ImageBox
                    id={`${image}-id`}
                    image={image}
                    className={`${styles[backgroundFilter]}`}
                    fileExtension={fileExtension}
                    border="square"
                    objectFit={objectFit}
                    objectPosition={objectPosition}
                    loading="lazy"
                    style={{
                        width: "100%",
                        height: "100%",
                        transition: "filter 0.3s ease-out",
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
export default BackgroundImage;
