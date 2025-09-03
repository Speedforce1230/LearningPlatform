import getFontClasses from "../../utility/getFont";
import styles from "./BaseText.module.css";
import { motion } from "framer-motion";

function BaseText({
    children,
    wrapper = "p",
    className = "",
    style = {},
    fontName = "raleway",
    textColor = "var(--default-white)",
    textShadow = "none",
    alignText = "center",
    fontSize = "var(--large-text)",
    textSelectionBackgroundColor = "yellow",
    textSelectionTextColor = "black",
    fontWeight = 600,
    dateTime = null,
    variants = {},
}) {
    // Wrapping the text so you can write p, span, time etc. tags
    const TextWrapper = motion[wrapper];
    // Getting font class names from utility
    const fontClass = getFontClasses(fontName);
    return (
        <TextWrapper
            className={`${styles["text"]} ${fontClass} ${className} `}
            // Setting up styles
            style={{
                ...style,
                color: textColor,
                textShadow,
                textAlign: alignText,
                fontSize,
                "--background-color": textSelectionBackgroundColor,
                "--text-color": textSelectionTextColor,
                fontWeight,
            }}
            // Framer motion variants.
            variants={variants}
            {...(dateTime && { dateTime })}
        >
            {children}
        </TextWrapper>
    );
}
export default BaseText;
