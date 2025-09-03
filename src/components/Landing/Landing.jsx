import BaseText from "../BaseText/BaseText";
import styles from "./Landing.module.css";
function Landing() {
    return (
        <div className={`${styles["container"]}`}>
            <BaseText
                textColor="var(--default-white)"
                fontName="raleway"
                fontSize="var(--heading)"
            >
                Hello World
            </BaseText>
        </div>
    );
}
export default Landing;
