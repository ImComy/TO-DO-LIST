const addButton = document.getElementsByClassName("add-button")[0];
const output = document.getElementsByClassName("addList")[0];
let emptyArray = [];

const storedArray = localStorage.getItem("todoList");
if (storedArray) {
  emptyArray = JSON.parse(storedArray);
  for (let i = 0; i < emptyArray.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = emptyArray[i];

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Done?";
    deleteButton.classList.add("delete-btn");

    deleteButton.addEventListener("click", function() {
      output.removeChild(listItem);
      emptyArray.shift(listItem);
      localStorage.setItem("todoList", JSON.stringify(emptyArray));
    });
    listItem.appendChild(deleteButton);
    output.appendChild(listItem);
  }
}

function adding() {
  const input = document.getElementsByClassName("input-text")[0];
  const inputValue = input.value.trim();

  if (inputValue === "") {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.textContent = "Please enter a value to add!";

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.classList.add("close");
    closeButton.addEventListener("click", () => popup.remove());
    popup.appendChild(closeButton);
    document.body.appendChild(popup);
    return;
  }
  emptyArray.unshift(inputValue); 
  console.log(emptyArray);
  while (output.firstChild) {
    output.removeChild(output.firstChild);
  }

  for (let i = 0; i < emptyArray.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = emptyArray[i];

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Done?";
    deleteButton.classList.add("delete-btn"); 

    deleteButton.addEventListener("click", function() {
      output.removeChild(listItem);
      emptyArray.shift(listItem);
      // Update local storage after deletion
      localStorage.setItem("todoList", JSON.stringify(emptyArray));
    });
    listItem.appendChild(deleteButton);
    output.appendChild(listItem);
  }

  input.value = "";
  // Save the updated array to local storage after adding
  localStorage.setItem("todoList", JSON.stringify(emptyArray));
}

addButton.addEventListener("click", adding);
