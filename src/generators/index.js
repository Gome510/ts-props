const defaultArgTypes = {
"number": `{
      control: {
        type: 'range',
        min: 0,
        max: 100,
      }
    }`
}

const noArgType = ["string", "boolean", "object"]

const defaultArgsValue = {
  string: "'Sample Text'",
  number: 0,
  boolean: true,
  array: "[]"
};

export function importStatements(filePath, fileName){  
  return `import { ${fileName} as ${fileName}Component } from "${filePath}";\n`
}

export function defaultExport(name, args, argTypes){
  return (
    `
export default {
  title: '${name}',
  component: ${name}Component,
  argTypes: {
${argTypes}
  },
  args: {
${args}
  },
};
`
  )
}

export function argTypes(types){
  const props = types.properties || {}
  let controlsArray = []
  
  Object.keys(props).forEach((key)=>{
    const control = defaultArgTypes[props[key].type]
    if(control && !noArgType.includes(props[key].type)){
      controlsArray.push(`    ${key}: ${control}`)
    }
  })
  
  return controlsArray.join(',\n')
}

export function args(types) {
  const props = types.properties|| {}
  //const required = types.required
  let argsArray = [];

  Object.keys(props).forEach((key)=>{
    //const isRequired = required.contains(key)
    const argsText = defaultArgsValue[props[key].type]
    argsArray.push(`    ${key}: ${argsText},`)
  })

  return argsArray.join('\n');
}

export function returnComponent(fileName){
  return (
`
export const ${fileName} = (args: any) => {
  return <${fileName}Component {...args} />;
};`
  )
}