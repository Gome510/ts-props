import { createGenerator } from "ts-json-schema-generator";
import { writeFileSync } from "fs";
import path from "path";

const repoRoot = process.cwd();
const config = {
  path: path.join(repoRoot, "src", ".tsx"),
  tsconfig: path.join(repoRoot, "tsconfig.json"),
  type: "ImpactScaleProps",
};
const schema = createGenerator(config).createSchema(config.type);
const schemaString = JSON.stringify(schema);

writeFileSync("schema.json", schemaString);
console.log(schema);
