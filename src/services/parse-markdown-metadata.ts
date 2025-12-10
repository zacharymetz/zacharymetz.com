/**
 * Required metadata keys for markdown frontmatter
 */
export interface MarkdownMetadata {
  title: string;
  description: string;
  date: string;
  "time-to-read": string;
}

/**
 * Result of parsing markdown metadata
 */
export interface ParseMarkdownResult {
  metadata: MarkdownMetadata;
  content: string;
}

/**
 * Required keys that must be present in the frontmatter
 */
const REQUIRED_KEYS: (keyof MarkdownMetadata)[] = [
  "title",
  "description",
  "date",
  "time-to-read",
];

/**
 * Parses YAML frontmatter from a markdown file string
 * @param fileContent - The full content of the markdown file as a string
 * @returns An object containing the metadata and the content without the frontmatter header
 * @throws Error if required metadata keys are missing
 */
export function parseMarkdownMetadata(
  fileContent: string
): ParseMarkdownResult {
  // Check if file starts with frontmatter delimiter
  if (!fileContent.trim().startsWith("---")) {
    throw new Error(
      `Markdown file must start with frontmatter delimiter (---). Missing required keys: ${REQUIRED_KEYS.join(
        ", "
      )}`
    );
  }

  // Find the first occurrence of --- (start of frontmatter)
  const firstDelimiterIndex = fileContent.indexOf("---");
  if (firstDelimiterIndex === -1) {
    throw new Error(
      `Markdown file must have frontmatter delimiter (---). Missing required keys: ${REQUIRED_KEYS.join(
        ", "
      )}`
    );
  }

  // Find the second occurrence of --- (end of frontmatter)
  const afterFirstDelimiter = fileContent.indexOf(
    "---",
    firstDelimiterIndex + 3
  );
  if (afterFirstDelimiter === -1) {
    throw new Error(
      `Markdown file must have closing frontmatter delimiter (---). Missing required keys: ${REQUIRED_KEYS.join(
        ", "
      )}`
    );
  }

  // Extract frontmatter section
  const frontmatterSection = fileContent
    .substring(firstDelimiterIndex + 3, afterFirstDelimiter)
    .trim();

  // Extract content (everything after the closing ---)
  const content = fileContent.substring(afterFirstDelimiter + 3).trim();

  // Parse frontmatter into key-value pairs
  const metadata: Partial<MarkdownMetadata> = {};
  const lines = frontmatterSection.split("\n");

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue; // Skip empty lines

    const colonIndex = trimmedLine.indexOf(":");
    if (colonIndex === -1) continue; // Skip lines without colons

    const key = trimmedLine.substring(0, colonIndex).trim();
    const value = trimmedLine.substring(colonIndex + 1).trim();

    // Remove quotes if present
    const cleanValue = value.replace(/^["']|["']$/g, "");

    if (key) {
      // Type assertion needed for keys with hyphens
      (metadata as Record<string, string>)[key] = cleanValue;
    }
  }

  // Validate that all required keys are present
  const missingKeys: string[] = [];
  for (const requiredKey of REQUIRED_KEYS) {
    if (!metadata[requiredKey] || metadata[requiredKey]!.trim() === "") {
      missingKeys.push(requiredKey);
    }
  }

  if (missingKeys.length > 0) {
    throw new Error(
      `Missing required metadata keys: ${missingKeys.join(
        ", "
      )}. Required keys are: ${REQUIRED_KEYS.join(", ")}`
    );
  }

  return {
    metadata: metadata as MarkdownMetadata,
    content,
  };
}
