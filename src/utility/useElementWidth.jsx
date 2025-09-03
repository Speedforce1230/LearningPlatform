import { useLayoutEffect, useState } from "react";

function useElementWidth({ ref, onResize = () => {} }) {
    const [width, setWidth] = useState(0);
    useLayoutEffect(() => {
        if (!ref.current) return;
        const object = ref.current;
        const update = () => {
            setWidth(object.offsetWidth);
            onResize();
        };
        requestAnimationFrame(update);
        const ro = new ResizeObserver(update);
        ro.observe(object);
        return () => ro.disconnect();
    }, [ref, onResize]);
    return width;
}
export default useElementWidth;
