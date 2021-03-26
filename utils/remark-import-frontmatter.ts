import { Transformer } from "unified";
import yaml from "js-yaml";
import { MdxastNode } from "./unist-types";
import createMdxjsEsmNode from "./create-mdxjsesm-node";

export interface HeaderMeta {
  rank: number;
  id: string;
  title: string;
}

const defaultOptions = {
  name: "meta",
};

interface RemarkImportFrontmatterOptions {
  name: string;
}

export default function remarkImportFrontmatter({
  name,
}: RemarkImportFrontmatterOptions = defaultOptions): Transformer {
  return (root: MdxastNode) => {
    const children = root.children as MdxastNode[];

    const firstChild = children[0];
    let config = {};

    if (firstChild && firstChild.type === "yaml") {
      config = yaml.load(firstChild.value as string) as Record<string, unknown>;
    }

    root.children.unshift(createMdxjsEsmNode(name, config));
  };
}
