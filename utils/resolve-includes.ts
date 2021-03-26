import { existsSync, readFileSync } from "fs";
import { join } from "path";

const includeRegexp = /(?:^|\n)([ \t]*)`?\{!([^!]+)!\}`?/g;

interface ResolveIncludesProps {
  value: string;
  rootDir: string;
  filePath: string;
}

const resolveIncludes = ({
  value,
  rootDir,
  filePath,
}: ResolveIncludesProps): string => {
  const result = value.replace(includeRegexp, (_, spaces, importPath) => {
    const fullImportPath = join(rootDir, importPath);

    if (existsSync(fullImportPath)) {
      const content = readFileSync(fullImportPath, "utf-8");

      return resolveIncludes({
        value: content,
        rootDir,
        filePath: fullImportPath,
      });
    } else {
      console.error(`Wrong import path ${importPath} in file ${filePath}.`);
      process.exit(1);
    }
  });

  return result;
};

export default resolveIncludes;
