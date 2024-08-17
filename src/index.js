//@ts-ignore
import { createGenerator } from "ts-json-schema-generator";
import { writeFileSync } from "fs";
import path from "path";
import { args } from "./generators/args.js";

const repoRoot = process.cwd();
const config = {
  path: path.join(repoRoot, "src", ".tsx"),
  tsconfig: path.join(repoRoot, "tsconfig.json"),
  type: "Props",
};
const schema = createGenerator(config).createSchema(config.type);
const schemaString = JSON.stringify(schema);
args(schema.definitions?.Props);

writeFileSync("schema.json", schemaString);
//console.log(schema);
