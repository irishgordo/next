/* inspired by docusaurus-mdx-loader */

import { Transformer } from "unified";
import { Element } from "hast";
import visit from "unist-util-visit";
import rank from "hast-util-heading-rank";
import toString from "hast-util-to-string";
import createMdxjsEsmNode from "./create-mdxjsesm-node";
import { MdxastNode } from "./unist-types";
import { Value } from "estree-util-value-to-estree";

interface RehypeHeadersOptions {
  name?: string;
  maxLevel: number;
}

export default function rehypeHeaders({
  name = "tableOfConents",
  maxLevel,
}: RehypeHeadersOptions): Transformer {
  return (root: MdxastNode) => {
    const headers: Value[] = [];

    visit<Element>(root, "element", function (node) {
      if (rank(node) && rank(node) <= maxLevel) {
        headers.push({
          rank: rank(node),
          id: node.properties?.id as string,
          title: toString(node),
        });
      }
    });

    root.children.unshift(createMdxjsEsmNode(name, headers));
  };
}
