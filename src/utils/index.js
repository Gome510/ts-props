export function isComponent(filePath){
  const isntTest = !filePath.includes(".test.");
  const isTsx = filePath.includes(".tsx");
  const isntIndex = !filePath.includes("index.tsx");
  const isntStories = !filePath.includes(".stories.");

  return isntTest && isTsx && isntIndex && isntStories;
}