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

export function argTypes(types){
  const props = types.properties
  let controlsArray = []
  
  Object.keys(props).forEach((key)=>{
    const control = defaultArgTypes[props[key].type]
    if(control && !noArgType.includes(props[key].type)){
      controlsArray.push(`    ${key}: ${control}`)
    }
  })
  
  return controlsArray.join(',\n')
}