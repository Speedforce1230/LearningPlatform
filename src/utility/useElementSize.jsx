import { useLayoutEffect, useState } from "react";

function useElementSize(ref, onResize = () => {}) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    useLayoutEffect(() => {
        if (!ref.current) return;
        const object = ref.current;
        const update = () => {
            setWidth(object.offsetWidth);
            setHeight(object.offsetHeight);
            onResize();
        };
        requestAnimationFrame(update);
        const ro = new ResizeObserver(update);
        ro.observe(object);
        return () => ro.disconnect();
    }, [ref, onResize]);
    return { width, height };
}
export default useElementSize;
