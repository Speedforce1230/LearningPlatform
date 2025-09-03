/* eslint-disable react-hooks/exhaustive-deps */
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import styles from "./SVGCarousel.module.css";
import CarouselBase from "../CarouselBase/CarouselBase";
import SVGComponent from "../SVGComponent/SVGComponent";
import useElementWidth from "../../../utility/useElementWidth";
import { useAnimation } from "motion/react";

function SVGCarousel({ data, className = "" }) {
    const sliderRef = useRef < HTMLDivElement > null;
    const duplicatedData = [...data, ...data];
    const svgRef = useRef < HTMLDivElement > null;
    const sliderControls = useAnimation();
    const [sliderGap, setSliderGap] = useState(0);
    const carouselRef = useRef < HTMLDivElement > null;
    const [resetting, setResetting] = useState(false);
    const onResize = useCallback(async () => {
        setResetting(true);
        await sliderControls.start({
            x: 0,
            transition: { duration: 1, ease: "easeOut" },
        });
        setResetting(false);
    }, [sliderControls]);
    const svgWidth = useElementWidth({ ref: svgRef, onResize });
    useLayoutEffect(() => {
        if (!sliderRef.current) return;
        const slider = sliderRef.current;
        const update = () => {
            const gap = parseFloat(
                getComputedStyle(slider).getPropertyValue("gap")
            );
            setSliderGap(Math.round(gap));

            onResize();
        };
        requestAnimationFrame(update);
        const ro = new ResizeObserver(update);
        ro.observe(slider);
        return () => ro.disconnect();
    }, [onResize]);

    const SPEED = 200;
    useEffect(() => {
        if (!svgRef.current || !sliderRef.current || resetting) return;

        const finalX = -data.length * (svgWidth + sliderGap);
        sliderControls.start({
            x: finalX,
            transition: {
                duration: Math.abs(finalX) / SPEED,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
            },
        });
    }, [sliderControls, svgWidth, sliderGap, data.length, resetting]);
    return (
        <CarouselBase
            carouselClassName={`${styles["svg-carousel"]} ${className}`}
            initialX={0}
            animateSlider={sliderControls}
            gap="clamp(20px, 5vw, 100px)"
            sliderRef={sliderRef}
            carouselRef={carouselRef}
            transition={{ duration: 1, ease: "easeOut" }}
            animation="infinite"
        >
            {duplicatedData.map((data, index) => (
                <SVGComponent
                    Component={data.Component}
                    path={data.path}
                    height="100%"
                    ref={index === 0 ? svgRef : null}
                    width="100%"
                    className={`${styles.logo}`}
                    key={index}
                ></SVGComponent>
            ))}
        </CarouselBase>
    );
}
export default SVGCarousel;
