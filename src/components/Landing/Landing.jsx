import BackgroundImage from "../BackgroundImage/BackgroundImage";
import BaseText from "../BaseText/BaseText";
import BlogPostCard from "../BlogPostCard/BlogPostCard";
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
            <BlogPostCard
                date="10/10/2025"
                image="images/cover_art2"
                readingTime="5 minutes"
                title="This is a test post"
                to="/"
                type="gaming"
                style={{ width: "48vw", aspectRatio: 16 / 9 }}
            ></BlogPostCard>
        </div>
    );
}
export default Landing;
