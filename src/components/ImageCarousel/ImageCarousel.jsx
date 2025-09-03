import styles from "./ImageCarousel.module.css";
import ImageBox from "../ImageBox/ImageBox";
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import React from "react";
import CarouselBase from "../CarouselBase/CarouselBase";
import useElementWidth from "../../../utility/useElementWidth";
import { useAnimation } from "motion/react";
const MemoizedImageBox = React.memo(ImageBox);
function ImageCarousel({ images, slideDuration = 5, slideAnimationDelay = 0 }) {
    const duplicatedImages = [...images, ...images];
    const sliderRef = useRef < HTMLDivElement > null;
    const imageRef = useRef < HTMLDivElement > null;
    const [sliderGap, setSliderGap] = useState(0);
    const sliderControls = useAnimation();

    const [resetting, setResetting] = useState(false);
    const reset = useCallback(async () => {
        setResetting(true);
        await sliderControls.start({
            x: 0,
            transition: { duration: 1, ease: "easeOut" },
        });
        setResetting(false);
    }, [sliderControls]);
    const imageWidth = useElementWidth({ ref: imageRef, onResize: reset });
    useLayoutEffect(() => {
        if (!sliderRef.current) return;
        const container = sliderRef.current;
        const update = () => {
            const gapString =
                getComputedStyle(container).getPropertyValue("gap");
            const gap = parseFloat(gapString);
            setSliderGap(gap);
            reset();
        };
        requestAnimationFrame(update);
        const ro = new ResizeObserver(update);
        ro.observe(container);
        return () => ro.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);
    useEffect(() => {
        if (!imageRef.current || !sliderRef.current || resetting) return;

        const finalX = -images.length * (imageWidth + sliderGap);
        sliderControls.start({
            x: finalX,
            transition: {
                duration: slideDuration * images.length,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
                delay: slideAnimationDelay,
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        sliderControls,
        imageWidth,
        sliderGap,
        images.length,
        resetting,
        slideAnimationDelay,
        slideDuration,
    ]);
    return (
        <CarouselBase
            carouselClassName={`${styles["image-carousel"]}`}
            gap="1em"
            initialX={0}
            animateSlider={sliderControls}
            animation="infinite"
            sliderRef={sliderRef}
        >
            {duplicatedImages.map((image, index) => (
                <MemoizedImageBox
                    key={index}
                    image={`${image}`}
                    loading="eager"
                    style={{
                        width: "clamp(300px, 45vw, 1000px)",
                    }}
                    ref={index === 0 ? imageRef : undefined}
                ></MemoizedImageBox>
            ))}
        </CarouselBase>
    );
}

export default ImageCarousel;
