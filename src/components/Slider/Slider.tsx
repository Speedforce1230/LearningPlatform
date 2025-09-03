import styles from "./Slider.module.css";
import {
    motion,
    type BoundingBox,
    type MotionStyle,
    type PanInfo,
    type TargetAndTransition,
    type Transition,
    type VariantLabels,
} from "motion/react";
export interface SliderProps {
    children: React.ReactNode;
    initialX?: number;
    finalX?: number;
    animateSlider?: boolean | TargetAndTransition | VariantLabels;
    sliderStyle?: MotionStyle;
    ref?: React.RefObject<HTMLDivElement | null>;
    transition?: Transition | undefined;
    gap?: string;
    drag?: boolean | "x" | "y";
    dragConstraints?:
        | false
        | Partial<BoundingBox>
        | {
              current: Element | null;
          };
    onDrag?: (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => void;
    onDragEnd?: (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => void;
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
}
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
}: SliderProps) {
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
