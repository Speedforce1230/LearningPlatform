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
        </div>
    );
}
export default Landing;
