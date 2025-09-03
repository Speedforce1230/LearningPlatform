import { loadImageFromCache, saveImageToCache } from "./imageCache";

const imageCache = new Map();
// Returns a promise of an image.
const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = `/${src}`;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Failed to load image"));
    });
};
const getImage = async (imgSrc) => {
    let image = await loadImageFromCache(imgSrc);
    if (!image) {
        image = await loadImage(imgSrc);
        await saveImageToCache(imgSrc, image);
    }
    return image;
};
const getImageColors = async (imgSrc, canvasSize = 100) => {
    // Preventing unnecessary loads if the image is already in cache.
    if (!imageCache.has(imgSrc)) {
        const img = await getImage(imgSrc);
        imageCache.set(imgSrc, img);
    }
    const img = imageCache.get(imgSrc);

    const rgbResults = [];
    const canvas = document.createElement("canvas");
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    // coordinates on the full image.
    const sourceX = (img.width - canvasSize) / 2;
    const sourceY = (img.height - canvasSize) / 2;
    // Calculating 9 different squares of canvasSize and setting a dominant color
    Array.from({ length: 3 }, (_, i) => {
        Array.from({ length: 3 }, (_, x) => {
            ctx.drawImage(
                img,
                sourceX * x,
                sourceY * i,
                canvasSize,
                canvasSize,
                0,
                0,
                canvas.width,
                canvas.height
            );

            const pixel = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            ).data;

            const colorMap = new Map();
            for (let i = 0; i < pixel.length; i += 4 * 5) {
                const r = pixel[i];
                const g = pixel[i + 1];
                const b = pixel[i + 2];
                const key = `${r},${g},${b}`;

                colorMap.set(key, (colorMap.get(key) || 0) + 1);
            }
            let dominantColor = "";
            let maxCount = 0;
            for (const [color, count] of colorMap.entries()) {
                if (count > maxCount) {
                    maxCount = count;
                    dominantColor = color;
                }
            }

            const [r, g, b] = dominantColor.split(",").map(Number);
            const rgb = {
                r,
                g,
                b,
            };
            rgbResults.push(rgb);
        });
    });

    return rgbResults;
};
export default getImageColors;
