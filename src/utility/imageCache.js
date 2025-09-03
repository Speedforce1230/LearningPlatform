import { openDB } from "idb";
const dbPromise = openDB("image-cache-learning", 1, {
    upgrade(db) {
        db.createObjectStore("images");
    },
});
export async function saveImageToCache(imgSrc, img) {
    const resp = await fetch(img.src, { mode: "cors" });
    const blob = await resp.blob();
    const db = await dbPromise;
    await db.put("images", blob, imgSrc);
}
export async function loadImageFromCache(key) {
    const db = await dbPromise;
    const blob = await db.get("images", key);
    if (!blob || blob.length === 0) return null;
    const img = new Image();
    img.src = URL.createObjectURL(blob);
    await img.decode();
    return img;
}
