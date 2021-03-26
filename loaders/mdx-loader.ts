import { getOptions } from "loader-utils";
import mdx from "@mdx-js/mdx";
import stringifyObject from "stringify-object";
import { parseMdxContent } from "../utils/data-fetcher-docs";

const DEFAULT_IMPORTS = `
/** @jsxRuntime classic */

import { mdx } from "@mdx-js/react";
import DocsPage from "components/DocsPage";
`;

const DEFAULT_EXPORT = `
const Wrapper = () => (
  <DocsPage
    meta={meta}
    navigation={navigation}
    versions={versions}
    tableOfConents={tableOfConents}
    githubUrl={githubUrl}
  >
    <MDXContent />
  </DocsPage>
);

export default Wrapper;
`;

module.exports = async function (originalContent: string) {
  const filePath = this.resourcePath;
  const callback = this.async();
  const options = Object.assign({}, getOptions(this), {
    filepath: filePath,
    skipExport: true,
  });

  const { content, navigation, versions, githubUrl } = parseMdxContent({
    filePath,
    content: originalContent,
  });

  let result: string;

  try {
    result = await mdx(content, options);
  } catch (err) {
    return callback(err);
  }

  const code = [
    DEFAULT_IMPORTS,
    result,
    `export const navigation = ${stringifyObject(navigation)};`,
    `export const versions = ${stringifyObject(versions)};`,
    `export const githubUrl = "${githubUrl}";`,
    DEFAULT_EXPORT,
  ].join("\n");

  return callback(null, code);
};
