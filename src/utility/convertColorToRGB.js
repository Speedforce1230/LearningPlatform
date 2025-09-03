function convertColorToRGB(l, c, h) {
    let hRad = (h / 180) * Math.PI;
    let a = Math.cos(hRad) * c;
    let b = Math.sin(hRad) * c;

    // Step 2: LAB to XYZ
    let fy = (l + 16) / 116;
    let fx = fy + a / 500;
    let fz = fy - b / 200;
    const white = [95.047, 100.0, 108.883]; // D65

    let xr = fx ** 3 > 0.008856 ? fx ** 3 : (fx - 16 / 116) / 7.787;
    let yr = fy ** 3 > 0.008856 ? fy ** 3 : (fy - 16 / 116) / 7.787;
    let zr = fz ** 3 > 0.008856 ? fz ** 3 : (fz - 16 / 116) / 7.787;

    let X = xr * white[0];
    let Y = yr * white[1];
    let Z = zr * white[2];

    // Step 3: XYZ to linear RGB
    let rLin = X * 3.2406 + Y * -1.5372 + Z * -0.4986;
    let gLin = X * -0.9689 + Y * 1.8758 + Z * 0.0415;
    let bLin = X * 0.0557 + Y * -0.204 + Z * 1.057;

    // Step 4: Linear to sRGB
    function gammaCorrect(C) {
        return C <= 0.0031308
            ? 12.92 * C
            : 1.055 * Math.pow(C, 1 / 2.4) - 0.055;
    }
    const rgb = {
        r: Math.min(255, Math.max(0, Math.round(gammaCorrect(rLin) * 255))),
        g: Math.min(255, Math.max(0, Math.round(gammaCorrect(gLin) * 255))),
        b: Math.min(255, Math.max(0, Math.round(gammaCorrect(bLin) * 255))),
    };
    return rgb;
}
export default convertColorToRGB;
