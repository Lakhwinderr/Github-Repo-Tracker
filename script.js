/*
get the data from the local storage
modify data and save it back to the local storage- a function for this
append the object to the DOM - need to make a function for this
create function to modify the data -> true false variables
*/

//get the data and save it in local storage -> this time in chrome
import { getData } from './getAndModifyData.js';
import { filterData } from './filterData.js';
const data = await getData(); // in top-level await (e.g. modern browser or in async function)

//let us save this data to local storage
if(localStorage.getItem('ourData')) {
  console.log('Data already exists in local storage.');
}else {
  console.log('Saving data to local storage.');
  localStorage.setItem('ourData', JSON.stringify(data));
}
//function to clear the local storage and save the data again
function clearAndSaveData(newData) {
  // localStorage.clear();
  localStorage.setItem('ourData', JSON.stringify(newData));
}


//function to append the object to the DOM
function appendToDOM(data) {
  const body = document.querySelector('body');
  data.forEach((obj, id) => {
    const div = document.createElement('div');
    div.className = 'grid repo';
    div.id = id; // setting the key for each div
    div.innerHTML = `
      <a class="repoNameAndDescription" href=${obj["Clone URL"]} target="_blank">
        <div class="repoName fw-semibold">${obj["Name"]}</div>
        <div class="repoDescription">${obj["Description"]}</div>
      </a>
      <div class="isYours" >
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
    div.querySelector('.isYours').addEventListener('click', () => toggleIsYours(id));
    div.querySelector('.hasCleanCode').addEventListener('click', () => toggleHasCleanCode(id));
    div.querySelector('.hasUpdatedMd').addEventListener('click', () => toggleHasUpdatedMd(id));


   
  });
  
  
}
//append the data to the DOM
appendToDOM(JSON.parse(localStorage.getItem('ourData')));




//function to toggle isYours property
function toggleIsYours(id) {
  const newData = JSON.parse(localStorage.getItem('ourData'));
  newData[id]["isYours"] = !newData[id]["isYours"];
  clearAndSaveData(newData);
  document.getElementById(id).querySelector('.isYours').textContent= newData[id]["isYours"] ? "✅" : "❌";
}
//function to toggle hasCleanCode property
function toggleHasCleanCode(id) {
  const newData = JSON.parse(localStorage.getItem('ourData'));
  newData[id]["hasCleanCode"] = !newData[id]["hasCleanCode"];
  clearAndSaveData(newData);
  document.getElementById(id).querySelector('.hasCleanCode').textContent = newData[id]["hasCleanCode"] ? "✅" : "❌";
}

//function to toggle hasUpdatedMd property
function toggleHasUpdatedMd(id) {
  const newData = JSON.parse(localStorage.getItem('ourData'));
  newData[id]["hasUpdatedMd"] = !newData[id]["hasUpdatedMd"];
  clearAndSaveData(newData);
  document.getElementById(id).querySelector('.hasUpdatedMd').textContent = newData[id]["hasUpdatedMd"] ? "✅" : "❌";
}

//select the div with id 'filters'
const filtersDiv = document.getElementById('filters');

//if the child nodes are clicked, call the filterAndDisplayData function
filtersDiv.addEventListener('click', (event) => {
  if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
    filterAndDisplayData();
  }
});

//function to filter the data
function filterAndDisplayData() {
  const isYours = document.getElementById('isYours').checked;
  const hasCleanCode = document.getElementById('hasCleanCode').checked;
  const hasUpdatedMd = document.getElementById('hasUpdatedMd').checked;

  const filteredData = filterData(isYours, hasCleanCode, hasUpdatedMd, JSON.parse(localStorage.getItem('ourData')));
  
  // Clear the existing DOM elements
  document.querySelectorAll('.repo').forEach(div => div.remove());
  
  // Append the filtered data to the DOM
  appendToDOM(filteredData);
} 


  document.querySelectorAll('#filters input[type="checkbox"]').forEach(input => {
    const label = document.querySelector(`label[for="${input.id}"]`);
    
    input.addEventListener('change', () => {
      if (input.checked) {
        label.classList.add('checked');
      } else {
        label.classList.remove('checked');
      }
    });
  });

