import convertColorToLCH from "./convertColorToLCH";

function pickPrettyColor(colors) {
    const oklchList = colors.map(convertColorToLCH);
    const filteredColors = oklchList
        .filter((rgb) => rgb.l >= 0.3)
        .sort((a, b) => b.c - a.c);
    return { pick: filteredColors[0], data: filteredColors };
}
export default pickPrettyColor;
