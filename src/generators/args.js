const defaultArgsValue = {
  string: "'Sample Text'",
  number: 0,
  boolean: true,
  array: "[]"
};

export function args(types) {
  const props = types.properties
  //const required = types.required
  let args = "";

  Object.keys(props).forEach((key)=>{
    //const isRequired = required.contains(key)
    const argsText = defaultArgsValue[props[key].type]
    args += `${key}: ${argsText},\n`
  })

  return args;
}
