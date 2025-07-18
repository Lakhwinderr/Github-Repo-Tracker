export async function getData() {
  const response = await fetch("output.json");
  const data = await response.json();

  return data.map((obj, id) => ({
    ...obj,
    id: id, // adding an id property for easier reference
    isYours: false,
    hasCleanCode: false,
    hasUpdatedMd: false
  }));
}



