const fontClasses = {
    raleway: "raleway-font-bold",
    arial: "arial-font-regular",
    "raleway-regular": "raleway-font-regular",
    righteous: "righteous-bold",
    playfair: "playfair-less-bold",
    "bebas neue": "bebas-neue",
    baskerville: "baskerville",
};

function getFontClasses(key) {
    return fontClasses[key] || "arial-font-regular";
}
export default getFontClasses;
