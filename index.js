const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const deleteBtn = document.getElementById('delete-btn');
const ulEl = document.querySelector('ul');
const modal = document.getElementById('delete-modal');
const modalConfirm = document.getElementById('modal-confirm');
const modalCancel = document.getElementById('modal-cancel');
let inputArray = [];
const fromLocalStorage = JSON.parse(localStorage.getItem("myItems"));

if (fromLocalStorage) {
  inputArray = JSON.parse(localStorage.getItem("myItems")); // Reassign the array to the content stored in localStorage after parsed from string to array 
  renderItems() // Invoke the function to display the localStorage by default
}

inputBtn.addEventListener('click', () => {
  console.log("Clicked");

  inputArray.push(inputEl.value); // Push content of input into the array

  localStorage.setItem("myItems", JSON.stringify(inputArray)); // Store the array as a string value (because localStorage cannot store arrays) in a key called "myItems"
  renderItems() // Invoke function when clicked
})

deleteBtn.addEventListener('click', showDeleteModal);

// Show delete confirmation modal
function showDeleteModal() {
  modal.classList.add('active');
}

// Hide modal
function hideModal() {
  modal.classList.remove('active');
}

// Handle confirm button click
modalConfirm.addEventListener('click', () => {
  clearItems();
  hideModal();
});

// Handle cancel button click
modalCancel.addEventListener('click', hideModal);

// Close modal when clicking outside the modal content
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    hideModal();
  }
});

// Function to render the content of the array in the DOM/Browser
function renderItems() {
  let listItem = ""; // Store the accumulation of the array from the `for` loop

  // Loop through each element of the array and assign to `listItem`
  for (let i = 0; i < inputArray.length; i++) {
    listItem += `
      <li>
        <a href = '${inputArray[i]}' target = '_blank'>
          ${inputArray[i]}
        </a>
      </li>`;
  }
  ulEl.innerHTML = listItem; // Render the accumulated items to the DOM
  inputEl.value = ""; // Reset the content of the input element
}

function clearItems() {
  if (inputArray && inputArray.length > 0) {
    inputArray = [];
    ulEl.innerHTML = "";
    localStorage.clear("myItems");
  }
}

