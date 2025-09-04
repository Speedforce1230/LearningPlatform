import Snowfall from "../Snowfall/Snowfall";
import styles from "./Landing.module.css";
import SectionContent from "./SectionContent/SectionContent";
import SectionIntro from "./SectionIntro/SectionIntro";

function Landing() {
    return (
        <div className={`${styles["container"]}`}>
            <div className={`${styles["content"]}`}>
                <SectionIntro></SectionIntro>
                <SectionContent></SectionContent>
            </div>
            <div className={`${styles["snowfall"]}`}>
                <Snowfall></Snowfall>
            </div>
        </div>
    );
}
export default Landing;
