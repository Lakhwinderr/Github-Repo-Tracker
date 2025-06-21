export async function getData() {
  const response = await fetch("output.json");
  const data = await response.json();

  return data.map(obj => ({
    ...obj,
    isYours: false,
    hasCleanCode: false,
    hasUpdatedMd: false
  }));
}



