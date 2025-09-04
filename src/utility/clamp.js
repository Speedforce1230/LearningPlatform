function clampNumber(value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;
    return value;
}
export default clampNumber;
