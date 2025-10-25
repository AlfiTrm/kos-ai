export function autoTitle(text: string, maxWords = 10) {
    if (!text) return "New chat";
    const clean = text
        .replace(/https?:\/\/\S+/g, "")
        .replace(/[^\p{L}\p{N}\s]/gu, "")
        .trim();
    const words = clean.split(/\s+/).slice(0, maxWords);
    if (!words.length) return "New chat";
    const t = words.join(" ");
    return t.charAt(0).toUpperCase() + t.slice(1);
}
