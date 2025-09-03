import getFontClasses from "../../utility/getFont";
import styles from "./Heading.module.css";
import { motion } from "framer-motion";

function Heading({
    children,
    textColor = "var(--default-white)",
    fontName = "raleway",
    headingLevel = "h2",
    fontSize = "var(--heading)",
    textShadow = "",
    textSelectionBackgroundColor = "yellow",
    textSelectionTextColor = "black",
    fontWeight = 800,
    style = {},
}) {
    // Can create any heading type from h1 to h6.
    const HeadingType = motion.create(headingLevel);
    // getting font classes.
    const fontClass = getFontClasses(fontName);

    return (
        <HeadingType
            // Getting module css, a simpler way of writing CSS in seperate files.
            className={`${fontClass} ${styles["heading"]}`}
            style={{
                color: textColor,
                fontSize,
                textShadow,
                "--background-color": textSelectionBackgroundColor,
                "--text-color": textSelectionTextColor,
                fontWeight,
                ...style,
            }}
        >
            {children}
        </HeadingType>
    );
}
export default Heading;
