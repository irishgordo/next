import glob from "glob";
import { writeFileSync } from "fs";
import { join, resolve } from "path";
import { format } from "date-fns";
import { loadSiteConfig, loadDocsConfig } from "./config";

const { latest, versions } = loadSiteConfig();

const NEXT_PUBLIC_ROOT_DIR = process.env.NEXT_PUBLIC_ROOT_DIR as string;
const NEXT_PUBLIC_HOST = process.env.NEXT_PUBLIC_HOST as string;

const getSlugDataListForVersion = (version: string) => {
  const root = join("/ver", version);
  const path = resolve("content", version, "docs/pages");

  return glob.sync(join(path, "**/*.mdx")).map((filename) => {
    return {
      slug: filename.replace(/\/?(index)?.mdx?$/, "/").replace(path, root),
      version,
    };
  });
};

const normalizeDocSlug = (slug: string, version: string) => {
  const isLatest = version === latest;

  return isLatest ? slug.replace(`/ver/${latest}`, "") : slug;
};

export const getLatestVersionRewirites = () =>
  getSlugDataListForVersion(latest).map(({ slug, version }) => ({
    source: NEXT_PUBLIC_ROOT_DIR + normalizeDocSlug(slug, version),
    destination: NEXT_PUBLIC_ROOT_DIR + slug,
  }));

export const generateSitemap = () => {
  const prefix = NEXT_PUBLIC_HOST + NEXT_PUBLIC_ROOT_DIR;
  const lastmod = format(new Date(), "yyyy-MM-dd");
  const data = getSlugDataListForVersion(latest);

  const sourcemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    data
      .map(({ slug, version }) => {
        return (
          "  <url>\n" +
          `    <loc>${prefix}${normalizeDocSlug(slug, version)}</loc>\n` +
          `    <lastmod>${lastmod}</lastmod>\n` +
          `    <changefreq>daily</changefreq>\n` +
          "  </url>\n"
        );
      })
      .join("") +
    "</urlset>";

  writeFileSync(resolve("public", "static", "sitemap.xml"), sourcemap);
};

export const getRedirects = () => {
  return versions.flatMap((version) => {
    const config = loadDocsConfig(version);

    return config.redirects ? config.redirects : [];
  });
};
