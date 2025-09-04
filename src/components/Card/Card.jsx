import BackgroundImage from "../BackgroundImage";
import styles from "./Card.module.css";
import Heading from "../Heading";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import useElementSize from "../../utility/useElementSize";
import BaseText from "../BaseText/BaseText";
function Card({ style, title }) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);
    const headingRef = useRef(null);
    const textRef = useRef(null);
    const cardSize = useElementSize(cardRef);
    const headingSize = useElementSize(headingRef);

    const headingX = `calc(${cardSize.width / 2}px - ${headingSize.width / 2}px - 2em)`;
    return (
        <motion.div
            className={`${styles.card}`}
            ref={cardRef}
            style={{
                ...style,
                perspective: "1000px",
                transformStyle: "preserve-3d",
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            initial={{ scale: 1 }}
            animate={isHovered ? { scale: 1.06 } : { scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <motion.div
                initial={{ x: 0 }}
                animate={isHovered ? { x: headingX } : { x: 0 }}
                transition={{ type: "spring", stiffness: 600, damping: 50 }}
                className={`${styles["heading-container"]}`}
                ref={headingRef}
            >
                <Heading fontName="raleway">{title}</Heading>
            </motion.div>

            <BackgroundImage
                image="images/quiz"
                fileExtension="png"
                backgroundFilter="shadow"
                brightnessLevel={0.5}
            ></BackgroundImage>
            <motion.div
                className={`${styles.background}`}
                initial={{ rotateY: 90, y: "50%", opacity: 0, scale: 0.7 }}
                animate={
                    isHovered
                        ? { rotateY: 0, y: 0, opacity: 1, scale: 1 }
                        : { rotateY: 90, y: "50%", opacity: 0, scale: 0.7 }
                }
                transition={{
                    type: "spring",
                    stiffness: 600,
                    damping: 76,
                    opacity: { duration: 0.3, ease: "easeOut" },
                }}
            >
                <motion.div
                    className={`${styles["text-container"]}`}
                    ref={textRef}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                        isHovered
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0 }
                    }
                    transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 50,
                        opacity: { duration: 0.3, ease: "easeOut" },
                    }}
                >
                    <BaseText>
                        Explore our quizzes made for all ages from 6th to 12th!
                    </BaseText>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
export default Card;
