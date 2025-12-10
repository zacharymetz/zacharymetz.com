import React, { ReactNode, createElement } from "react";

/**
 * Recursive Markdown to JSX Parser
 * Converts markdown string to React JSX components
 * Based on: https://github.com/adam-p/markdown-here/wiki/markdown-cheatsheet
 */

/**
 * Key counter object passed through all parsing functions
 * Ensures deterministic keys between server and client renders
 */
interface KeyCounter {
  value: number;
}

function createKeyCounter(): KeyCounter {
  return { value: 0 };
}

function getKey(counter: KeyCounter): string {
  return `md-${counter.value++}`;
}

/**
 * Parse inline markdown elements (emphasis, links, code, images)
 * This is the recursive part that handles nested inline elements
 */
function parseInline(text: string, counter: KeyCounter): ReactNode[] {
  const elements: ReactNode[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    // Check for inline code first (highest priority, no nesting)
    const inlineCodeMatch = remaining.match(/^`([^`]+)`/);
    if (inlineCodeMatch) {
      elements.push(
        <code key={getKey(counter)} className="md-inline-code">
          {inlineCodeMatch[1]}
        </code>
      );
      remaining = remaining.slice(inlineCodeMatch[0].length);
      continue;
    }

    // Check for images ![alt](url "title" =widthxheight align)
    // Supports: ![alt](url), ![alt](url "title"), ![alt](url =300), ![alt](url =300x200),
    // ![alt](url left), ![alt](url =300 right), ![alt](url "title" =300 center)
    // ![alt](url inline) - for inline images that size to their container
    const imageMatch = remaining.match(
      /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?(?:\s+=(\d+)(?:x(\d+))?)?(?:\s+(left|center|right|inline))?\)/
    );
    if (imageMatch) {
      const [, alt, src, title, widthStr, heightStr, align] = imageMatch;
      const width = widthStr ? parseInt(widthStr, 10) : undefined;
      const height = heightStr ? parseInt(heightStr, 10) : undefined;
      const isInline = align === "inline";
      const alignment = isInline ? "center" : align || "center";

      const style: React.CSSProperties = {};
      if (width) {
        style.maxWidth = width;
        style.width = "100%";
      }
      if (height) {
        style.height = height;
      }

      // Inline images render without wrapper, block images get wrapper for alignment
      // Use <span> instead of <div> to avoid hydration errors when inside <p>
      if (isInline) {
        elements.push(
          <img
            key={getKey(counter)}
            src={src}
            alt={alt}
            title={title || undefined}
            className="md-image-inline"
            style={Object.keys(style).length > 0 ? style : undefined}
          />
        );
      } else {
        elements.push(
          <span
            key={getKey(counter)}
            className={`md-image-wrapper md-image-${alignment}`}
          >
            <img
              src={src}
              alt={alt}
              title={title || undefined}
              className="md-image"
              style={Object.keys(style).length > 0 ? style : undefined}
            />
          </span>
        );
      }
      remaining = remaining.slice(imageMatch[0].length);
      continue;
    }

    // Check for links [text](url "title")
    const linkMatch = remaining.match(
      /^\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/
    );
    if (linkMatch) {
      elements.push(
        <a
          key={getKey(counter)}
          href={linkMatch[2]}
          title={linkMatch[3] || undefined}
          className="md-link"
        >
          {parseInline(linkMatch[1], counter)}
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // Check for strikethrough ~~text~~
    const strikeMatch = remaining.match(/^~~([^~]+)~~/);
    if (strikeMatch) {
      elements.push(
        <del key={getKey(counter)} className="md-strikethrough">
          {parseInline(strikeMatch[1], counter)}
        </del>
      );
      remaining = remaining.slice(strikeMatch[0].length);
      continue;
    }

    // Check for bold+italic ***text*** or ___text___
    const boldItalicMatch = remaining.match(/^(\*\*\*|___)([^*_]+)\1/);
    if (boldItalicMatch) {
      elements.push(
        <strong key={getKey(counter)} className="md-bold">
          <em className="md-italic">
            {parseInline(boldItalicMatch[2], counter)}
          </em>
        </strong>
      );
      remaining = remaining.slice(boldItalicMatch[0].length);
      continue;
    }

    // Check for bold **text** or __text__
    const boldMatch = remaining.match(/^(\*\*|__)([^*_]+)\1/);
    if (boldMatch) {
      elements.push(
        <strong key={getKey(counter)} className="md-bold">
          {parseInline(boldMatch[2], counter)}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Check for italic *text* or _text_ (but not inside words for _)
    const italicMatch = remaining.match(/^(\*|_)([^*_]+)\1/);
    if (italicMatch) {
      elements.push(
        <em key={getKey(counter)} className="md-italic">
          {parseInline(italicMatch[2], counter)}
        </em>
      );
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Check for auto-linked URLs
    const urlMatch = remaining.match(
      /^<(https?:\/\/[^>]+)>|^(https?:\/\/[^\s<]+)/
    );
    if (urlMatch) {
      const url = urlMatch[1] || urlMatch[2];
      elements.push(
        <a key={getKey(counter)} href={url} className="md-link md-autolink">
          {url}
        </a>
      );
      remaining = remaining.slice(urlMatch[0].length);
      continue;
    }

    // No match found - consume one character as plain text
    // But try to batch consecutive plain text
    let plainEnd = 1;
    while (plainEnd < remaining.length) {
      const nextChar = remaining[plainEnd];
      // Check if next position could start a markdown element
      if (
        nextChar === "`" ||
        nextChar === "[" ||
        nextChar === "!" ||
        nextChar === "*" ||
        nextChar === "_" ||
        nextChar === "~" ||
        nextChar === "<" ||
        remaining.slice(plainEnd).match(/^https?:\/\//)
      ) {
        break;
      }
      plainEnd++;
    }
    elements.push(remaining.slice(0, plainEnd));
    remaining = remaining.slice(plainEnd);
  }

  return elements;
}

/**
 * Parse a table from lines
 */
function parseTable(
  lines: string[],
  startIndex: number,
  counter: KeyCounter
): { element: ReactNode; endIndex: number } {
  const tableLines: string[] = [];
  let i = startIndex;

  // Collect all table lines
  while (i < lines.length && lines[i].includes("|")) {
    tableLines.push(lines[i]);
    i++;
  }

  if (tableLines.length < 2) {
    return { element: null, endIndex: startIndex };
  }

  // Parse header row
  const headerCells = tableLines[0]
    .split("|")
    .map((cell) => cell.trim())
    .filter((cell) => cell !== "");

  // Parse alignment row
  const alignmentRow = tableLines[1];
  const alignments: ("left" | "center" | "right")[] = alignmentRow
    .split("|")
    .map((cell) => cell.trim())
    .filter((cell) => cell !== "")
    .map((cell) => {
      if (cell.startsWith(":") && cell.endsWith(":")) return "center";
      if (cell.endsWith(":")) return "right";
      return "left";
    });

  // Parse body rows
  const bodyRows = tableLines.slice(2).map((line) =>
    line
      .split("|")
      .map((cell) => cell.trim())
      .filter((cell) => cell !== "")
  );

  const element = (
    <table key={getKey(counter)} className="md-table">
      <thead>
        <tr>
          {headerCells.map((cell, idx) => (
            <th
              key={getKey(counter)}
              style={{ textAlign: alignments[idx] || "left" }}
            >
              {parseInline(cell, counter)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodyRows.map((row) => (
          <tr key={getKey(counter)}>
            {row.map((cell, idx) => (
              <td
                key={getKey(counter)}
                style={{ textAlign: alignments[idx] || "left" }}
              >
                {parseInline(cell, counter)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return { element, endIndex: i - 1 };
}

/**
 * Parse a list (ordered or unordered) recursively
 */
function parseList(
  lines: string[],
  startIndex: number,
  baseIndent: number,
  counter: KeyCounter
): { element: ReactNode; endIndex: number } {
  const firstLine = lines[startIndex];
  const isOrdered = /^\s*\d+\.\s/.test(firstLine);
  const items: ReactNode[] = [];
  let i = startIndex;

  while (i < lines.length) {
    const line = lines[i];
    const indentMatch = line.match(/^(\s*)/);
    const currentIndent = indentMatch ? indentMatch[1].length : 0;

    // Check if this line is a list item at our level
    const listItemMatch = isOrdered
      ? line.match(/^(\s*)\d+\.\s+(.*)/)
      : line.match(/^(\s*)[-*+]\s+(.*)/);

    if (listItemMatch && currentIndent === baseIndent) {
      const content = listItemMatch[2];

      // Check if next lines are sub-list or continuation
      const subElements: ReactNode[] = [parseInline(content, counter)];
      let j = i + 1;

      while (j < lines.length) {
        const nextLine = lines[j];
        const nextIndentMatch = nextLine.match(/^(\s*)/);
        const nextIndent = nextIndentMatch ? nextIndentMatch[1].length : 0;

        if (nextLine.trim() === "") {
          j++;
          continue;
        }

        // Check if it's a sub-list
        const subListMatch =
          nextLine.match(/^(\s*)[-*+]\s+/) || nextLine.match(/^(\s*)\d+\.\s+/);

        if (subListMatch && nextIndent > baseIndent) {
          const { element: subList, endIndex } = parseList(
            lines,
            j,
            nextIndent,
            counter
          );
          if (subList) {
            subElements.push(subList);
          }
          j = endIndex + 1;
          continue;
        }

        // Check if it's a continuation (indented paragraph)
        if (nextIndent > baseIndent && !subListMatch) {
          subElements.push(<br key={getKey(counter)} />);
          subElements.push(parseInline(nextLine.trim(), counter));
          j++;
          continue;
        }

        break;
      }

      items.push(<li key={getKey(counter)}>{subElements}</li>);
      i = j;
    } else if (currentIndent < baseIndent || line.trim() === "") {
      // End of this list level
      if (line.trim() === "" && i === startIndex) {
        i++;
        continue;
      }
      break;
    } else {
      i++;
    }
  }

  if (items.length === 0) {
    return { element: null, endIndex: startIndex };
  }

  const element = isOrdered ? (
    <ol key={getKey(counter)} className="md-ordered-list">
      {items}
    </ol>
  ) : (
    <ul key={getKey(counter)} className="md-unordered-list">
      {items}
    </ul>
  );

  return { element, endIndex: i - 1 };
}

/**
 * Parse a code block (fenced with ``` or indented)
 */
function parseCodeBlock(
  lines: string[],
  startIndex: number,
  counter: KeyCounter
): { element: ReactNode; endIndex: number } {
  const firstLine = lines[startIndex];

  // Fenced code block
  if (firstLine.trim().startsWith("```")) {
    const language = firstLine.trim().slice(3).trim();
    const codeLines: string[] = [];
    let i = startIndex + 1;

    while (i < lines.length && !lines[i].trim().startsWith("```")) {
      codeLines.push(lines[i]);
      i++;
    }

    const element = (
      <pre key={getKey(counter)} className="md-code-block">
        <code className={language ? `language-${language}` : undefined}>
          {codeLines.join("\n")}
        </code>
      </pre>
    );

    return { element, endIndex: i };
  }

  // Indented code block (4 spaces or 1 tab)
  if (firstLine.match(/^(\s{4}|\t)/)) {
    const codeLines: string[] = [];
    let i = startIndex;

    while (
      i < lines.length &&
      (lines[i].match(/^(\s{4}|\t)/) || lines[i].trim() === "")
    ) {
      codeLines.push(lines[i].replace(/^(\s{4}|\t)/, ""));
      i++;
    }

    const element = (
      <pre key={getKey(counter)} className="md-code-block">
        <code>{codeLines.join("\n").trimEnd()}</code>
      </pre>
    );

    return { element, endIndex: i - 1 };
  }

  return { element: null, endIndex: startIndex };
}

/**
 * Parse a blockquote recursively
 */
function parseBlockquote(
  lines: string[],
  startIndex: number,
  counter: KeyCounter
): { element: ReactNode; endIndex: number } {
  const quoteLines: string[] = [];
  let i = startIndex;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith(">")) {
      // Remove the > and optional space
      quoteLines.push(line.replace(/^>\s?/, ""));
      i++;
    } else if (line.trim() === "" && quoteLines.length > 0) {
      // Empty line might continue quote
      const nextLine = lines[i + 1];
      if (nextLine && nextLine.startsWith(">")) {
        quoteLines.push("");
        i++;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  if (quoteLines.length === 0) {
    return { element: null, endIndex: startIndex };
  }

  // Recursively parse the content inside the blockquote
  const innerContent = parseMarkdownBlock(quoteLines.join("\n"), counter);

  const element = (
    <blockquote key={getKey(counter)} className="md-blockquote">
      {innerContent}
    </blockquote>
  );

  return { element, endIndex: i - 1 };
}

/**
 * Check if a line is a horizontal rule
 */
function isHorizontalRule(line: string): boolean {
  const trimmed = line.trim();
  return (
    /^[-]{3,}$/.test(trimmed) ||
    /^[*]{3,}$/.test(trimmed) ||
    /^[_]{3,}$/.test(trimmed)
  );
}

/**
 * Parse a header line
 */
function parseHeader(line: string, counter: KeyCounter): ReactNode | null {
  // ATX-style headers (# H1, ## H2, etc.)
  const atxMatch = line.match(/^(#{1,6})\s+(.+)$/);
  if (atxMatch) {
    const level = atxMatch[1].length as 1 | 2 | 3 | 4 | 5 | 6;
    const content = atxMatch[2];
    return createElement(
      `h${level}`,
      { key: getKey(counter), className: `md-header md-h${level}` },
      parseInline(content, counter)
    );
  }
  return null;
}

/**
 * Check if the next line makes this line a setext header
 */
function isSetextHeader(
  currentLine: string,
  nextLine: string | undefined
): { level: 1 | 2; content: string } | null {
  if (!nextLine || currentLine.trim() === "") return null;

  if (/^=+\s*$/.test(nextLine)) {
    return { level: 1, content: currentLine };
  }
  if (/^-+\s*$/.test(nextLine) && !isHorizontalRule(currentLine)) {
    return { level: 2, content: currentLine };
  }
  return null;
}

/**
 * Main function: Convert markdown string to JSX
 */
export function markdownToJsx(markdown: string): ReactNode {
  const counter = createKeyCounter();
  return parseMarkdownBlock(markdown, counter);
}

/**
 * Parse a block of markdown (used for recursion)
 */
function parseMarkdownBlock(markdown: string, counter: KeyCounter): ReactNode {
  const lines = markdown.split("\n");
  const elements: ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Skip empty lines (they'll be handled by paragraph grouping)
    if (trimmedLine === "") {
      i++;
      continue;
    }

    // Check for fenced code block
    if (trimmedLine.startsWith("```")) {
      const { element, endIndex } = parseCodeBlock(lines, i, counter);
      if (element) {
        elements.push(element);
        i = endIndex + 1;
        continue;
      }
    }

    // Check for indented code block
    if (line.match(/^(\s{4}|\t)/) && !line.trim().match(/^[-*+]\s|^\d+\.\s/)) {
      const { element, endIndex } = parseCodeBlock(lines, i, counter);
      if (element) {
        elements.push(element);
        i = endIndex + 1;
        continue;
      }
    }

    // Check for horizontal rule
    if (isHorizontalRule(line)) {
      elements.push(<hr key={getKey(counter)} className="md-hr" />);
      i++;
      continue;
    }

    // Check for setext-style headers (underlined)
    const setextHeader = isSetextHeader(line, lines[i + 1]);
    if (setextHeader) {
      elements.push(
        createElement(
          `h${setextHeader.level}`,
          {
            key: getKey(counter),
            className: `md-header md-h${setextHeader.level}`,
          },
          parseInline(setextHeader.content, counter)
        )
      );
      i += 2; // Skip both lines
      continue;
    }

    // Check for ATX-style headers
    const header = parseHeader(line, counter);
    if (header) {
      elements.push(header);
      i++;
      continue;
    }

    // Check for blockquote
    if (line.startsWith(">")) {
      const { element, endIndex } = parseBlockquote(lines, i, counter);
      if (element) {
        elements.push(element);
        i = endIndex + 1;
        continue;
      }
    }

    // Check for table
    if (
      line.includes("|") &&
      lines[i + 1]?.includes("|") &&
      lines[i + 1]?.match(/[-:]+/)
    ) {
      const { element, endIndex } = parseTable(lines, i, counter);
      if (element) {
        elements.push(element);
        i = endIndex + 1;
        continue;
      }
    }

    // Check for unordered list
    if (/^\s*[-*+]\s+/.test(line)) {
      const indentMatch = line.match(/^(\s*)/);
      const baseIndent = indentMatch ? indentMatch[1].length : 0;
      const { element, endIndex } = parseList(lines, i, baseIndent, counter);
      if (element) {
        elements.push(element);
        i = endIndex + 1;
        continue;
      }
    }

    // Check for ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const indentMatch = line.match(/^(\s*)/);
      const baseIndent = indentMatch ? indentMatch[1].length : 0;
      const { element, endIndex } = parseList(lines, i, baseIndent, counter);
      if (element) {
        elements.push(element);
        i = endIndex + 1;
        continue;
      }
    }

    // Check for raw HTML block (simple detection)
    if (
      trimmedLine.startsWith("<") &&
      !trimmedLine.startsWith("<a") &&
      !trimmedLine.startsWith("<img")
    ) {
      const htmlMatch = trimmedLine.match(/^<(\w+)[\s>]/);
      if (htmlMatch) {
        const tagName = htmlMatch[1];
        const htmlLines: string[] = [line];
        let j = i + 1;

        // Collect until closing tag or empty line
        const closingTag = `</${tagName}>`;
        while (j < lines.length) {
          htmlLines.push(lines[j]);
          if (lines[j].includes(closingTag)) {
            break;
          }
          j++;
        }

        elements.push(
          <div
            key={getKey(counter)}
            className="md-html"
            dangerouslySetInnerHTML={{ __html: htmlLines.join("\n") }}
          />
        );
        i = j + 1;
        continue;
      }
    }

    // Default: treat as paragraph
    // Collect consecutive lines that aren't special
    const paragraphLines: string[] = [line];
    let j = i + 1;

    while (j < lines.length) {
      const nextLine = lines[j];
      const nextTrimmed = nextLine.trim();

      // Stop at empty line
      if (nextTrimmed === "") break;

      // Stop at special blocks
      if (
        nextTrimmed.startsWith("#") ||
        nextTrimmed.startsWith(">") ||
        nextTrimmed.startsWith("```") ||
        nextLine.match(/^(\s{4}|\t)/) ||
        /^[-*+]\s+/.test(nextTrimmed) ||
        /^\d+\.\s+/.test(nextTrimmed) ||
        isHorizontalRule(nextLine) ||
        /^=+\s*$/.test(nextTrimmed) ||
        /^-+\s*$/.test(nextTrimmed) ||
        (nextLine.includes("|") && lines[j + 1]?.includes("|"))
      ) {
        break;
      }

      paragraphLines.push(nextLine);
      j++;
    }

    // Handle line breaks: two trailing spaces = <br>
    const paragraphContent: ReactNode[] = [];
    for (let k = 0; k < paragraphLines.length; k++) {
      const pLine = paragraphLines[k];
      const hasLineBreak = pLine.endsWith("  ");
      paragraphContent.push(...parseInline(pLine.trimEnd(), counter));
      if (k < paragraphLines.length - 1) {
        if (hasLineBreak) {
          paragraphContent.push(<br key={getKey(counter)} />);
        } else {
          paragraphContent.push(" ");
        }
      }
    }

    elements.push(
      <p key={getKey(counter)} className="md-paragraph">
        {paragraphContent}
      </p>
    );
    i = j;
  }

  return <>{elements}</>;
}

/**
 * Component wrapper for markdown content
 */
interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({
  content,
  className = "",
}: MarkdownProps): React.ReactElement {
  return (
    <div className={`md-content ${className}`.trim()}>
      {markdownToJsx(content)}
    </div>
  );
}

export default Markdown;
