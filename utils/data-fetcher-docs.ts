import { resolve } from "path";
import resolveIncludes from "./resolve-includes";
import { loadDocsConfig, loadSiteConfig } from "./config";

const { versions, latest, branches } = loadSiteConfig();

const { NEXT_PUBLIC_GITHUB_DOCS } = process.env;

export const getVersion = (filepath: string) => {
  const result = /\/content\/([^/]+)\/docs\//.exec(filepath);
  return (result && result[1]) as string;
};

interface ParseMdxContentProps {
  content: string;
  filePath: string;
}

export const parseMdxContent = ({
  content: originalContent,
  filePath,
}: ParseMdxContentProps) => {
  const current = getVersion(filePath);
  const { navigation } = loadDocsConfig(current);
  const root = resolve(`content/${current}`);
  const content = resolveIncludes({
    value: originalContent,
    rootDir: root,
    filePath,
  });

  const githubUrl = branches[current]
    ? filePath.replace(
        root,
        `${NEXT_PUBLIC_GITHUB_DOCS}/edit/${branches[current]}`
      )
    : "";

  return {
    content,
    navigation,
    githubUrl,
    versions: {
      current,
      latest,
      available: versions,
    },
  };
};
