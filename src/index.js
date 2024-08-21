//@ts-ignore
import { createGenerator } from "ts-json-schema-generator";
import { writeFileSync, readdirSync, statSync } from "fs";
import path from "path";
import { args } from "./generators/args.js";
import { argTypes } from "./generators/argTypes.js";
import { Default } from "./generators/default.js";

const repoRoot = process.cwd();

const config = {
  path: path.join(repoRoot, "src", ".tsx"),
  tsconfig: path.join(repoRoot, "tsconfig.json"),
  type: "Props",
};
const schema = createGenerator(config).createSchema(config.type);
const schemaString = JSON.stringify(schema);

function listFiles(directoryPath){
  const files = readdirSync(directoryPath)

  files.forEach(file => {
    const filePath = path.join(directoryPath, file);
    const fileStat = statSync(filePath);

    if(fileStat.isDirectory()){
      listFiles(filePath)
    }else if(filePath.includes(".tsx") && !filePath.includes("index")){
      //make storybook file
      const fileName = file.split(".")[0];
      console.log(fileName)
      const types = schema.definitions?.Props;
      
      console.log(filePath)
      writeFileSync("output.txt",Default(fileName, args(types), argTypes(types)))
    }
  });
  return;
}

listFiles(repoRoot)
