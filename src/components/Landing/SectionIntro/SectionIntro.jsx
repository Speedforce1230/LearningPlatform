import { useState } from "react";
import styles from "./SectionIntro.module.css";
import Heading from "../../Heading";
import BaseText from "../../BaseText/BaseText";
import { motion } from "framer-motion";
function SectionIntro() {
    const [shouldAnimate, setShouldAnimate] = useState(false);
    return (
        <motion.div
            className={`${styles["intro"]}`}
            onHoverStart={() => setShouldAnimate(true)}
            onHoverEnd={() => setShouldAnimate(false)}
        >
            <div className={`${styles["wrapper"]}`}>
                <Heading
                    textColor="var(--default-white)"
                    fontName="raleway"
                    fontSize="var(--heading)"
                    textShadow="var(--small-black-text-shadow)"
                >
                    Welcome to{" "}
                    <BaseText
                        wrapper="span"
                        textColor="transparent"
                        fontSize="var(--heading)"
                        className={`${styles["logo"]}`}
                        fontName="raleway"
                    >
                        Q
                    </BaseText>
                    uiz{" "}
                    <BaseText
                        wrapper="span"
                        fontName="raleway"
                        textColor="transparent"
                        fontSize="var(--heading)"
                        className={`${styles["logo"]}`}
                    >
                        A
                    </BaseText>
                    dventure
                </Heading>
                <motion.span
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`${styles["underline"]}`}
                ></motion.span>
            </div>
        </motion.div>
    );
}
export default SectionIntro;
