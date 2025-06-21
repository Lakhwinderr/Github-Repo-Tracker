/*
get the data from the local storage
modify data and save it back to the local storage- a function for this
append the object to the DOM - need to make a function for this
create function to modify the data -> true false variables
*/

//get the data and save it in local storage -> this time in chrome
import { getData } from './getAndModifyData.js';

const data = await getData(); // in top-level await (e.g. modern browser or in async function)
console.log(data);

//let us save this data to local storage
if(localStorage.getItem('ourData')) {
  console.log('Data already exists in local storage.');
}else {
  console.log('Saving data to local storage.');
  localStorage.setItem('ourData', JSON.stringify(data));
}

//function to append the object to the DOM
function appendToDOM(data) {
  const body = document.querySelector('body');
  data.forEach(obj => {
    const div = document.createElement('div');
    div.className = 'grid repo';
    div.innerHTML = `
      <a class="repoNameAndDescription" href=${obj["Clone URL"]} target="_blank">
        <div class="repoName fw-semibold">${obj["Name"]}</div>
        <div class="repoDescription">${obj["Description"]}</div>
      </a>
      <div class="isYours">
        ${obj["isYours"] ? "✅" : "❌"}
      </div>
      <div class="hasCleanCode">
         ${obj["hasCleanCode"] ? "✅" : "❌"}
      </div>
      <div class="hasUpdatedMd">
         ${obj["hasUpdatedMd"] ? "✅" : "❌"}
      </div>
    `;
    body.appendChild(div);
  });
  
  
}

appendToDOM(data);
// localStorage.setItem("ourData", JSON.stringify(newData));