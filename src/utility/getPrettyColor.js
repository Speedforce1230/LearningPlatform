import getImageColors from "./getImageColor";
import pickPrettyColor from "./pickPrettyColor";

export async function getPrettyColor(imgSrc, canvasSize = 100) {
    const imageColors = await getImageColors(imgSrc, canvasSize);
    const { pick, data } = pickPrettyColor(imageColors);
    return { pick, data };
}
