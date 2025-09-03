// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import styles from "./ImageBox.module.css";

function ImageBox({
    image,
    alt = "Image",
    width = undefined,
    border = "round",
    loading = "lazy",
    className = "",
    style = undefined,
    objectFit = "cover",
    objectPosition = "",
    fileExtension = "jpg",
    ref = null,
    id = "",
    imageRef = null,
}) {
    const dynamicStyle = {
        width,
        ...(border === "circle" ? { aspectRatio: 1 } : {}),
        ...style,
    };

    return (
        <motion.div
            className={`${styles["image-container"]} ${styles[border]} ${className}`}
            style={dynamicStyle}
            ref={ref}
        >
            <img
                ref={imageRef}
                id={id}
                src={`/${image}.${fileExtension}`}
                alt={alt}
                loading={loading}
                style={{ objectFit, objectPosition }}
                decoding="async"
            />
        </motion.div>
    );
}

export default ImageBox;
