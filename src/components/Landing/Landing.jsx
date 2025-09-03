import BackgroundImage from "../BackgroundImage/BackgroundImage";
import BaseText from "../BaseText/BaseText";
import Heading from "../Heading";
import styles from "./Landing.module.css";
function Landing() {
    return (
        <div className={`${styles["container"]}`}>
            <Heading
                textColor="var(--default-white)"
                fontName="raleway"
                fontSize="var(--heading)"
            >
                Hello World
            </Heading>
            <BackgroundImage
                image="images/cover_art2"
                fileExtension="jpg"
                backgroundFilter="shadow"
            ></BackgroundImage>
        </div>
    );
}
export default Landing;
