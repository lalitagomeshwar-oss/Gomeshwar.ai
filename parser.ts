import { Chapter } from "./types";

export function parseChapters(text: string): Chapter[] {
  if (!text) return [];
  const chapters: Chapter[] = [];
  const normalizedText = text.replace(/\r\n/g, "\n");
  const parts = normalizedText.split(/\n##\s+/);
  
  const firstPart = parts[0];
  if (firstPart.trim() && !normalizedText.startsWith("##")) {
    const cleanContent = firstPart.trim();
    chapters.push({
      id: "intro",
      title: "Introduction",
      content: cleanContent,
      bullets: extractBullets(cleanContent),
      visualPrompt: "Introduction Diagram & Overview",
    });
  }

  for (let i = 1; i < parts.length; i++) {
    const section = parts[i];
    const lines = section.split("\n");
    const title = lines[0].trim();
    const content = lines.slice(1).join("\n").trim();
    if (title && content) {
      chapters.push({
        id: `chap-${i}`,
        title: title,
        content: content,
        bullets: extractBullets(content),
        visualPrompt: generateVisualPrompt(title, content),
      });
    }
  }
  return chapters;
}

function extractBullets(text: string): string[] {
  const lines = text.split("\n");
  const bullets: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("-") || trimmed.startsWith("*") || /^\d+\./.test(trimmed)) {
      const cleanBullet = trimmed.replace(/^[-*•]\s+/, "").replace(/^\d+\.\s+/, "").trim();
      if (cleanBullet) bullets.push(cleanBullet);
    }
  }
  return bullets.length > 0 ? bullets.slice(0, 5) : [];
}

function generateVisualPrompt(title: string, content: string): string {
  return `${title} Visual Schematics & Abstract Concepts`;
}

