import Slider from "../Slider/Slider";
import styles from "./CarouselBase.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
function CarouselBase({
    sliderRef = undefined,
    carouselRef = undefined,
    sliderTransition = { duration: 0.3, ease: "easeOut" },
    carouselClassName = "",
    animation = "infinite",
    initial = undefined,
    whileInView = undefined,
    transition = undefined,
    handleNextItem = () => {},
    handlePrevItem = () => {},
    disableNextButton = () => false,
    disablePrevButton = () => false,
    iconColor = "white",
    variants,
    ...sliderProps
}) {
    return (
        <motion.div
            className={`${carouselClassName} ${styles["carousel"]} `}
            initial={initial}
            whileInView={whileInView}
            transition={transition}
            variants={variants}
            viewport={{ amount: 0.3, once: true }}
            ref={carouselRef}
        >
            <Slider
                ref={sliderRef}
                transition={sliderTransition}
                {...sliderProps}
            ></Slider>
            {animation === "controlled" && (
                <div className={`${styles["buttons"]}`}>
                    <button
                        className={`${styles["button"]}`}
                        onClick={() => handlePrevItem()}
                        title="previous"
                        disabled={disablePrevButton()}
                    >
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className={`${styles["icon"]}`}
                            style={{ color: iconColor }}
                        ></FontAwesomeIcon>
                    </button>
                    <button
                        className={`${styles["button"]}`}
                        onClick={() => handleNextItem()}
                        title="next"
                        disabled={disableNextButton()}
                    >
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className={`${styles["icon"]}`}
                            style={{ color: iconColor }}
                        ></FontAwesomeIcon>
                    </button>
                </div>
            )}
        </motion.div>
    );
}
export default CarouselBase;
