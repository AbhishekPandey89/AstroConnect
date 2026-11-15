
import Sanscript from "@indic-transliteration/sanscript";

export const transliterateName = (name, language = "en") => {
  if (!name || typeof name !== "string") return "";

  const value = name.trim();

  // Already non-English script: keep it unchanged.
  if (/[^\u0000-\u007F]/.test(value)) return value;

  const targetScripts = {
    hi: "devanagari",
    kn: "kannada",
  };

  const target = targetScripts[language];

  // English language or unsupported language: original name.
  if (!target) return value;

  try {
    return Sanscript.t(value.toLowerCase(), "itrans", target);
  } catch (error) {
    console.error("Name transliteration failed:", error);
    return value;
  }
};
