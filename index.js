const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const tabBtn = document.getElementById('tab-btn');
const ulEl = document.querySelector('ul');
const deleteBtn = document.getElementById('delete-btn');
const deleteOverlay = document.querySelector('.delete-overlay');
const deleteCancel = document.getElementById('delete-cancel');
const deleteConfirm = document.getElementById('delete-confirm');
let inputArray = [];
const fromLocalStorage = JSON.parse(localStorage.getItem("myItems")); // Turn strings in localStorage into arrays

if (fromLocalStorage) {
  inputArray = JSON.parse(localStorage.getItem("myItems")); // Reassign the array to the content stored in localStorage after parsed from string to array 
  render(inputArray) // Invoke the function to display the localStorage by default
}

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    inputArray.push(tabs[0].url);
    localStorage.setItem("myItems", JSON.stringify(inputArray)); // Turn arrays from JS into strings in localStorage (localStorage cannot store arryas)
    render(inputArray)
  })
})

// Function to render the content of the array in the DOM/Browser
function render(items) {
  let listItem = ""; // Store the accumulation of the array from the `for` loop

  // Loop through each element of the array and assign to `listItem`
  for (let i = 0; i < items.length; i++) {
    listItem += `
      <li>
        <a href = '${items[i]}' target = '_blank'>
          ${items[i]}
        </a>
      </li>`;
  }
  ulEl.innerHTML = listItem; // Render the accumulated items to the DOM
  inputEl.value = ""; // Reset the content of the input element
}

inputBtn.addEventListener('click', () => {
  console.log("Clicked");

  inputArray.push(inputEl.value); // Push content of input into the array

  localStorage.setItem("myItems", JSON.stringify(inputArray)); // Store the array as a string value (because localStorage cannot store arrays) in a key called "myItems"
  render(inputArray) // Invoke function when clicked
})

// DELETE LOGIC
deleteBtn.addEventListener('click', () => {
  deleteOverlay.style.display = "flex";
});

deleteCancel.addEventListener('click', () => {
  deleteOverlay.style.display = "none";
});

deleteConfirm.addEventListener('click', () => {
  clearItems();
  deleteOverlay.style.display = "none";
});

function clearItems() {
  if (inputArray) {
    ulEl.innerHTML = "";
    localStorage.removeItem("myItems");
    inputArray = [];
    setTimeout(() => alert("All links deleted successfully"), 100);
  } else {
    alert("You don't have any saved links");
  }
}