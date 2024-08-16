import { JSONSchema7 } from "json-schema";

const argsDefaults = {
  string: "Sample Text",
  number: 0,
  boolean: true,
};

export function Args(definition: JSONSchema7) {
  const required = definition.Props;
  const args = "";
  console.log(Object.entries(definition), required);
  return args;
}
