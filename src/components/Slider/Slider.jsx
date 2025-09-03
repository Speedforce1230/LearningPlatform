import styles from "./Slider.module.css";

function Slider({
    children,
    initialX = 0,
    finalX = 0,
    ref,
    transition = undefined,
    drag = false,
    dragConstraints = false,
    gap = "0px",
    onDrag = () => {},
    onDragEnd = () => {},
    sliderStyle = {},
    animateSlider = { x: finalX },
    onHoverEnd = () => {},
    onHoverStart = () => {},
}) {
    return (
        <motion.div
            className={`${styles["slider"]}`}
            initial={{ x: initialX }}
            animate={animateSlider}
            transition={transition}
            drag={drag}
            dragConstraints={dragConstraints}
            style={{ gap, ...sliderStyle }}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            onHoverEnd={onHoverEnd}
            onHoverStart={onHoverStart}
            ref={ref}
        >
            {children}
        </motion.div>
    );
}
export default Slider;
