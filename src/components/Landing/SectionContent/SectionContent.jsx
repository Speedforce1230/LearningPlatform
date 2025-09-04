import Card from "../../Card/Card";
import styles from "./SectionContent.module.css";
function SectionContent() {
    return (
        <div className={`${styles["section-content"]}`}>
            <Card
                style={{
                    width: "clamp(300px, 40vw, 900px)",
                    aspectRatio: 16 / 9,
                }}
                title="Quizzes"
            ></Card>
        </div>
    );
}
export default SectionContent;
