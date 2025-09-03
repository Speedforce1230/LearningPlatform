function sRGBToLinear(value) {
    const linear = value / 255;
    return linear <= 0.04045
        ? linear / 12.92
        : Math.pow((linear + 0.055) / 1.055, 2.4);
}
function linearToOKLAB(R, G, B) {
    const l = 0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B;
    const m = 0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B;
    const s = 0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B;
    const l_ = Math.cbrt(l);
    const m_ = Math.cbrt(m);
    const s_ = Math.cbrt(s);
    const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
    const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
    const b = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
    return { L, a, b };
}
function convertColorToLCH({ r, g, b }) {
    const R = sRGBToLinear(r);
    const G = sRGBToLinear(g);
    const B = sRGBToLinear(b);
    const lab = linearToOKLAB(R, G, B);
    const c = Math.hypot(lab.a, lab.b);
    let h = Math.atan2(lab.b, lab.a) * (180 / Math.PI);
    if (h < 0) h += 360;
    return { l: lab.L, c, h };
}
export default convertColorToLCH;
