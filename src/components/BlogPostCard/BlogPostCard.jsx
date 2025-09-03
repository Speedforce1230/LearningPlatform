/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import BaseText from "../BaseText/BaseText";
import ImageBox from "../ImageBox/ImageBox";
import styles from "./BlogPostCard.module.css";
import { motion } from "framer-motion";
import Heading from "../Heading";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../data/icons/icons";
import usePrettyColor from "../../utility/usePrettyColor";
import clampNumber from "../../utility/clamp";
import convertToUTC from "../../utility/convertToUTC";
function BlogPostCard({
    className = "",
    imageLoading = "eager",
    style = {},
    image,
    title,
    date,
    imageExtension = "jpg",
    parentMotionComplete = true,
    textReveal = "reveal",
    ref = null,
    grayscale = "default",
    to,
    type,
    textMask = "",
    textHeight = "",
    readingTime,
    tabIndex = -1,
    imageCanvasSize = 100,
}) {
    // To detect hover state on the parent card.
    const [shouldAnimate, setShouldAnimate] = useState(false);
    // To calculate widths for other animations.
    const headingRef = useRef < HTMLDivElement > null;
    const textRef = useRef < HTMLDivElement > null;
    const [headingScrollWidth, setHeadingScrollWidth] = useState(0);
    const [textWidth, setTextWidth] = useState(0);
    // Waiting on pretty color for the backgrounds of the cards.
    const { pick } = usePrettyColor(
        `${image}.${imageExtension}`,
        imageCanvasSize
    );

    useEffect(() => {
        if (!headingRef.current || !textRef.current) return;
        const heading = headingRef.current;
        const text = textRef.current;
        const updateHeading = () => setHeadingScrollWidth(heading.scrollWidth);
        const updateText = () => {
            const padding = parseFloat(getComputedStyle(text).padding);
            setTextWidth(text.clientWidth - padding);
        };
        requestAnimationFrame(() => {
            updateHeading();
            updateText();
        });
        const ro = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === text) updateText();
                else if (entry.target === heading) updateHeading();
            }
        });
        ro.observe(heading);
        ro.observe(text);
        return () => ro.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const totalDistance = headingScrollWidth - textWidth + 5;
    const captilizedType = type.charAt(0).toUpperCase() + type.slice(1);
    const isAnimating = shouldAnimate || textReveal === "noReveal";
    // Calculating the speed of the headline scroll.
    const speed = 100;
    const time = totalDistance / speed;
    const duration = clampNumber(time, 0.3, 5);
    const icon = icons[type];
    // To prevent hovers from happening while another animation is in play.
    const handleHoverStart = () => {
        if (parentMotionComplete) {
            setShouldAnimate(true);
        }
    };
    // Setting some styles, will be used in the background gradient of the text-container.
    const colorStyles = {
        "--L": `${pick.l}`,
        "--C": `${pick.c}`,
        "--H": `${pick.h}`,
        "--pretty-color": `var(--L) var(--C) var(--H)`,
        "--gradient-color": `oklch(var(--pretty-color) / 0.4)`,
    };

    const textColor =
        pick.l >= 0.8 ? "var(--default-black)" : "var(--default-white)";
    const cardStyles = {
        ...style,
        ...colorStyles,
    };
    return (
        <div
            onFocus={() => setShouldAnimate(true)}
            onBlur={() => setShouldAnimate(false)}
            aria-labelledby={`date-${convertToUTC(
                date
            )} title-${title} by Vasu`}
            style={{ ...cardStyles }}
            tabIndex={tabIndex}
        >
            <motion.div
                className={`${styles["card"]} ${className}`}
                onHoverStart={handleHoverStart}
                onHoverEnd={() => setShouldAnimate(false)}
                ref={ref}
            >
                <motion.div
                    className={`${styles["image-container"]}`}
                    initial={{
                        scale: 1,
                        ...(grayscale === "default" && {
                            filter: "grayscale(100%)",
                        }),
                    }}
                    animate={
                        shouldAnimate
                            ? {
                                  scale: 1.05,
                                  ...(grayscale === "default" && {
                                      filter: "grayscale(0%)",
                                  }),
                              }
                            : {
                                  scale: 1,
                                  ...(grayscale === "default" && {
                                      filter: "grayscale(100%)",
                                  }),
                              }
                    }
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <ImageBox
                        image={image}
                        border="flat"
                        objectFit="cover"
                        style={{
                            height: "100%",
                            width: "100%",
                        }}
                        objectPosition="20% 50%"
                        loading={imageLoading}
                        fileExtension={imageExtension}
                    ></ImageBox>
                </motion.div>
                <motion.div
                    className={`${styles["reading-time"]}`}
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={
                        shouldAnimate || textReveal === "noReveal"
                            ? { x: 0, opacity: 1 }
                            : { x: "-100%", opacity: 0 }
                    }
                    transition={{
                        duration: 0.3,
                        ease: "easeOut",
                    }}
                >
                    <BaseText
                        fontName="arial"
                        fontSize="clamp(0.3rem, 3vw, 1.5rem)"
                        fontWeight={300}
                        textColor={textColor}
                        textShadow="var(--small-black-text-shadow)"
                        wrapper="p"
                    >
                        {readingTime}
                    </BaseText>
                </motion.div>
                <motion.div
                    className={`${styles["icon"]}`}
                    initial={{ y: "-100%" }}
                    animate={isAnimating ? { y: 0 } : { y: "-100%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    aria-label="icon"
                    title={`Category: ${captilizedType}`}
                >
                    <FontAwesomeIcon
                        icon={icon}
                        fontSize="var(--large-text)"
                    ></FontAwesomeIcon>
                </motion.div>
                <motion.div
                    className={`${styles["text-container"]}`}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={
                        isAnimating
                            ? { y: 0.5, opacity: 1 }
                            : {
                                  y: "100%",

                                  opacity: 0,
                              }
                    }
                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        opacity: { duration: 1, ease: "easeOut" },
                    }}
                    style={{
                        WebkitMaskImage: textMask,
                        maskImage: textMask,
                        height: textHeight,
                    }}
                    ref={textRef}
                >
                    <motion.div
                        className={`${styles["heading-container"]}`}
                        initial={{ x: 0 }}
                        animate={
                            isAnimating && headingScrollWidth > textWidth
                                ? { x: [0, -totalDistance] }
                                : { x: 0 }
                        }
                        transition={
                            isAnimating && headingScrollWidth > textWidth
                                ? {
                                      duration,
                                      ease: "easeOut",
                                      repeat: Infinity,
                                      repeatType: "mirror",
                                      repeatDelay: 2,
                                      delay: 1,
                                  }
                                : { duration: 0, ease: "easeOut", delay: 0.3 }
                        }
                        style={{ marginTop: "auto" }}
                        ref={headingRef}
                    >
                        <Heading
                            fontName="baskerville"
                            textColor="var(--default-white)"
                            headingLevel="h2"
                            textShadow="var(--small-black-text-shadow)"
                            fontSize="var(--sub-heading)"
                            style={{
                                display: "inline-block",
                                whiteSpace: "nowrap",
                            }}
                            fontWeight={600}
                        >
                            {title}
                        </Heading>
                        <motion.span
                            className={`${styles["seperator"]}`}
                            initial={{ x: "-110%" }}
                            animate={shouldAnimate ? { x: 0 } : { x: "-110%" }}
                            transition={{
                                duration: 0.5,
                                ease: "easeOut",
                                delay: 0.15,
                            }}
                        ></motion.span>
                    </motion.div>
                    <BaseText
                        fontName="arial"
                        fontSize="clamp(0.3rem, 2vw, 1.5rem)"
                        fontWeight={300}
                        textColor="#D0D0FF"
                        textShadow="var(--small-black-text-shadow)"
                        wrapper="time"
                        dateTime={date}
                    >
                        {date}
                    </BaseText>
                </motion.div>
            </motion.div>
        </div>
    );
}
export default BlogPostCard;
