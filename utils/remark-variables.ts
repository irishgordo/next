import { Transformer } from "unified";
import visit from "unist-util-visit";
import { loadDocsConfig } from "./config";
import { getVersion } from "./data-fetcher-docs";
import { MdxastNode } from "./unist-types";

// Variable replacement related logic

interface GeneratedRegexp {
  regexp: RegExp;
  value: string;
}

const generateRegexps = (vars: Record<string, unknown>, prefix?: string) => {
  let result: GeneratedRegexp[] = [];

  Object.entries(vars).forEach(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object") {
      result = [
        ...result,
        ...generateRegexps(value as Record<string, unknown>, path),
      ];
    } else {
      result.push({
        regexp: new RegExp(`\\[\\[\\s?${path}\\s?\\]\\]`, "g"),
        value: value as string,
      });
    }
  });

  return result;
};

const replaceVars = (value: string, vars: Record<string, unknown>) =>
  generateRegexps(vars).reduce((result, { regexp, value }) => {
    return result.replace(regexp, value.toString());
  }, value);

const hasValue = (node: MdxastNode) => typeof node.value === "string";

export default function remarkVariables(): Transformer {
  return (root: MdxastNode, vfile) => {
    const version = getVersion(vfile.path);
    const { variables } = loadDocsConfig(version);

    visit<MdxastNode>(root, [hasValue], (node) => {
      node.value = replaceVars(node.value, variables);
    });
  };
}
