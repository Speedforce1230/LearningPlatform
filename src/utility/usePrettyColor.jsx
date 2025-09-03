import { useEffect, useState } from "react";
import { getPrettyColor } from "./getPrettyColor";
export const BLACK_LCH = { l: 0, c: 0, h: 0 };
// Hook to use pretty color, returns a pretty color(Highest Chroma) and the rest of the sampled colors sorted by chroma descending order.
// Also returns a loading and error state.
function usePrettyColor(imgSrc, canvasSize = 100) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [pick, setPick] = useState(BLACK_LCH);
    const [data, setData] = useState([]);
    useEffect(() => {
        if (!imgSrc) return;
        // to prevent running on unmount
        let cancelled = false;
        setLoading(true);
        setError(null);
        async function getColor() {
            try {
                const res = await getPrettyColor(imgSrc, canvasSize);
                if (!cancelled) {
                    // To prevent website from crashing in case the pick isn't received. Shouldn't happen but as a last resort.
                    setPick(res.pick ?? BLACK_LCH);
                    setData(res.data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err instanceof Error ? err : new Error(String(err))
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }
        getColor();
        return () => {
            cancelled = true;
        };
    }, [imgSrc, canvasSize]);
    return { loading, error, pick, data };
}
export default usePrettyColor;
