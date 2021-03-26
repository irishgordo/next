import { Value, valueToEstree } from "estree-util-value-to-estree";
import stringifyObject from "stringify-object";

const createMdxjsEsmNode = (name: string, data: Value) => {
  return {
    type: "mdxjsEsm",
    value: `export const ${name} = ${stringifyObject(data)};`,
    data: {
      estree: {
        type: "Program",
        sourceType: "module",
        body: [
          {
            type: "ExportNamedDeclaration",
            source: null,
            specifiers: [],
            declaration: {
              type: "VariableDeclaration",
              kind: "const",
              declarations: Object.entries({ [name]: data }).map(
                ([identifier, value]) => ({
                  type: "VariableDeclarator",
                  id: { type: "Identifier", name: identifier },
                  init: valueToEstree(value),
                })
              ),
            },
          },
        ],
      },
    },
  };
};

export default createMdxjsEsmNode;
