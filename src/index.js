import { createGenerator } from "ts-json-schema-generator";
import { writeFileSync, readdirSync, statSync } from "fs";
import path from "path";

import { args, argTypes, defaultExport, importStatements, returnComponent } from "./generators/index.js";
import { isComponent } from "./utils/index.js";



  const cwd = process.cwd();
  const componentsDir = path.join(cwd,"components")
  const storiesDir = path.join(cwd,"stories")

  

  function listFiles(directoryPath){
    console.log(directoryPath)
    const files = readdirSync(directoryPath)
    
    
    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      const fileStat = statSync(filePath);

      if(fileStat.isDirectory()){
        listFiles(filePath)
      }else if(isComponent(filePath)){
        const config = {
          path: filePath,
          tsconfig: path.join(cwd, "tsconfig.json"),
          type: "Props",
          expose: "all",
          skipTypeCheck: true,
        };
        console.log(filePath)
        
        let schema = {}
        try {
           schema = createGenerator(config).createSchema(config.type) || {definitions: { Props: {}}}
        } catch (error) {
           schema = {definitions: { Props: {}}}
        }

        const fileName = file.split(".")[0];
        const storybookFilePath = path.join(storiesDir,`${fileName}.stories.tsx`)
        const relativePath = path.relative(storiesDir, filePath)
        
        const types = schema.definitions?.Props;
        
        let storybookText = ''
        storybookText += importStatements(relativePath, fileName).replace(/\\/g, '/')
        storybookText += defaultExport(fileName, args(types), argTypes(types))
        storybookText += returnComponent(fileName)

        //writeFileSync(storybookFilePath, storybookText)
      }
    });
    return;
  }

  try {
    listFiles(componentsDir)
  } catch (error) {
    console.error(error)
  }

/* }else{
  console.log(
    `Usage Error: missing required arguments. 
Expected Usage: npm run generateStories --components <components-dir-path> --stories <stories-dir-path>
Note: paths need to be relative.
`);
} */