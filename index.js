const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEl = document.querySelector('ul');
let inputArray = [];


console.log(typeof inputArray)

// localStorage.setItem("items", JSON.stringify(inputArray));

inputBtn.addEventListener('click', () => {
  console.log("Clicked");

  inputArray.push(inputEl.value); // Push content of input into the array

  localStorage.setItem("myItems", JSON.stringify(inputArray)); // Store the array as a string value (because localStorage cannot store arrays) in a key called "myItems"
  renderItems() // Invoke function when clicked
})

// Function to render the content of the array in the DOM/Browser
function renderItems() {
  let listItem = ""; // Store the accumulation of the array from the `for` loop

  inputArray = JSON.parse(localStorage.getItem("myItems")); // Reassign the array to the content stored in localStorage after parsed from string to array 

  // Loop through each element of the array and assign to `listItem`
  for (let i =0; i < inputArray.length; i++) {
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

  renderItems() // Invoke the function to display the localStorage by default
