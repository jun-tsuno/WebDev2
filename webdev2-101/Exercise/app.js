//Adding a note
const form = document.querySelector("#add");
const input = document.querySelector("#add-input");
const listParent = document.querySelector("#list");
const clonedChild = listParent.children[0].cloneNode(true);
const clonedParagraph = clonedChild.querySelector("p");

let userInput = "";

const handleChange = (e) => {
	userInput = e.target.value;
	e.target.value = "";
};

const handleSubmit = (e) => {
	e.preventDefault();
	if (userInput === "") return;
	clonedParagraph.innerText = userInput;
	const newList = document.createElement("li");
	newList.innerHTML = clonedChild.innerHTML;
	return listParent.appendChild(newList);
};

input.addEventListener("change", handleChange);
form.addEventListener("submit", handleSubmit);
