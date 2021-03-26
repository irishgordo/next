import { Node } from "unist";
import { Root, Element, DocType, Comment, Text } from "hast";

export interface MdxastNode extends Node {
  value?: string;
  children?: MdxastNode[];
}

export type RehypeNode = Root | Element | DocType | Comment | Text;

export interface JsxNode extends MdxastNode {
  type: "jsx";
  value: string;
}

export interface EsmNode extends Node {
  type: "mdxjsEsm";
  value: string;
  default: boolean;
}

export type MdxhastNode = RehypeNode | JsxNode | EsmNode;

export type MdxhastRootNode = {
  type: "root";
  children: MdxhastNode[];
};

export interface AdmonitionNode extends MdxastNode {
  type: "admonition";
  data: {
    type: string;
    title?: string;
    content: string;
  };
}
