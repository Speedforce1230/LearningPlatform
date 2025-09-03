function convertToUTC(date) {
    const [d, m, y] = date.split("/");
    const UTCDate = `${y}-${m}-${d}`;
    return UTCDate;
}
export default convertToUTC;
