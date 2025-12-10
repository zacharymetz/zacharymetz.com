export interface RobotsConfig {
  allowPaths?: string[];
  disallowPaths?: string[];
  sitemapUrl?: string;
  userAgent?: string;
}

export function generateRobotsTxt(config: RobotsConfig = {}): string {
  const {
    allowPaths = [],
    disallowPaths = [],
    sitemapUrl,
    userAgent = "*",
  } = config;

  const lines: string[] = [];

  // User-agent line
  lines.push(`User-agent: ${userAgent}`);

  // Allow paths
  for (const path of allowPaths) {
    lines.push(`Allow: ${path}`);
  }

  // Disallow paths
  for (const path of disallowPaths) {
    lines.push(`Disallow: ${path}`);
  }

  // Sitemap (if provided)
  if (sitemapUrl) {
    lines.push("");
    lines.push(`Sitemap: ${sitemapUrl}`);
  }

  return lines.join("\n");
}
