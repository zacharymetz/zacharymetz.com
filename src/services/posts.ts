import fs from "fs";
import path from "path";
import {
  parseMarkdownMetadata,
  MarkdownMetadata,
} from "./parse-markdown-metadata";

/**
 * Post metadata with slug for routing
 */
export interface PostMeta extends MarkdownMetadata {
  slug: string;
}

/**
 * Full post with content
 */
export interface Post extends PostMeta {
  content: string;
}

/**
 * Get the posts directory path
 */
function getPostsDirectory(): string {
  // In production, posts are copied to dist/posts
  const distPostsDir = path.join(process.cwd(), "dist", "posts");
  if (process.env.NODE_ENV === "production" && fs.existsSync(distPostsDir)) {
    return distPostsDir;
  }
  return path.join(process.cwd(), "posts");
}

/**
 * Load all markdown files from the posts directory and return their metadata
 * @returns Array of post metadata sorted by date (newest first)
 */
export async function loadAllPosts(): Promise<PostMeta[]> {
  const postsDir = getPostsDirectory();

  // Check if directory exists
  if (!fs.existsSync(postsDir)) {
    console.warn(`Posts directory not found: ${postsDir}`);
    return [];
  }

  // Get all .md files
  const allFiles = fs.readdirSync(postsDir);
  const files: string[] = [];
  for (const file of allFiles) {
    if (file.endsWith(".md")) {
      files.push(file);
    }
  }

  const posts: PostMeta[] = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const filePath = path.join(postsDir, file);

    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { metadata } = parseMarkdownMetadata(fileContent);

      posts.push({
        ...metadata,
        slug,
      });
    } catch (error) {
      console.error(`Error parsing post ${file}:`, error);
      // Skip invalid posts
    }
  }

  // Sort by date (newest first)
  posts.sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return posts;
}

/**
 * Load a specific post by slug
 * @param slug - The post slug (filename without .md extension)
 * @returns The full post with content, or null if not found
 */
export async function loadPost(slug: string): Promise<Post | null> {
  const postsDir = getPostsDirectory();
  const filePath = path.join(postsDir, `${slug}.md`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { metadata, content } = parseMarkdownMetadata(fileContent);

    return {
      ...metadata,
      slug,
      content,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

/**
 * Parse date string in format DD-MM-YYYY or MM-DD-YYYY
 */
function parseDate(dateStr: string): Date {
  // Try DD-MM-YYYY format first (common in the example)
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const [first, second, year] = parts;
    // If year is 4 digits and at the end, assume DD-MM-YYYY
    if (year.length === 4) {
      const day = parseInt(first, 10);
      const month = parseInt(second, 10) - 1; // JS months are 0-indexed
      return new Date(parseInt(year, 10), month, day);
    }
  }

  // Fallback to native Date parsing
  return new Date(dateStr);
}

/**
 * Check if a post exists by slug
 * @param slug - The post slug
 * @returns True if post exists
 */
export async function postExists(slug: string): Promise<boolean> {
  const postsDir = getPostsDirectory();
  const filePath = path.join(postsDir, `${slug}.md`);
  return fs.existsSync(filePath);
}

/**
 * Get all post slugs (useful for static generation)
 * @returns Array of post slugs
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const postsDir = getPostsDirectory();

  if (!fs.existsSync(postsDir)) {
    return [];
  }

  const allFiles = fs.readdirSync(postsDir);
  const slugs: string[] = [];

  for (const file of allFiles) {
    if (file.endsWith(".md")) {
      const slug = file.replace(/\.md$/, "");
      slugs.push(slug);
    }
  }

  return slugs;
}
