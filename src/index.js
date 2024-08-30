import { createGenerator } from "ts-json-schema-generator";
import { writeFileSync, readdirSync, statSync } from "fs";
import path from "path";

import { args, argTypes, defaultExport, importStatements, returnComponent } from "./generators/index.js";



  const cwd = process.cwd();
  const componentsDir = path.join(cwd,"components")
  const storiesDir = path.join(cwd,"stories")

  

  function listFiles(directoryPath){
    const files = readdirSync(directoryPath)
    const config = {
      path: path.join(directoryPath, "*"),
      tsconfig: path.join(cwd, "tsconfig.json"),
      type: "*",
      expose: "all",
      skipTypeCheck: true,
    };
    const schema = createGenerator(config).createSchema(config.type);

    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      const fileStat = statSync(filePath);

      if(fileStat.isDirectory()){
        listFiles(filePath)
      }else if(filePath.includes(".tsx") && !filePath.includes("index")){
        let storybookText = ''

        const fileName = file.split(".")[0];
        const storybookFilePath = path.join(storiesDir,`${fileName}.stories.tsx`)
        const relativePath = path.relative(storiesDir, filePath)
        const types = schema.definitions?.Props || {};
        
        storybookText += importStatements(relativePath, fileName)
        storybookText += defaultExport(fileName, args(types), argTypes(types))
        storybookText += returnComponent(fileName)

        writeFileSync(storybookFilePath, storybookText)
      }
    });
    return;
  }

  listFiles(componentsDir)

/* }else{
  console.log(
    `Usage Error: missing required arguments. 
Expected Usage: npm run generateStories --components <components-dir-path> --stories <stories-dir-path>
Note: paths need to be relative.
`);
} */