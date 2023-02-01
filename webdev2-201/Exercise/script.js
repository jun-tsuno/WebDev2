/**
 * Assign a click event handler to the add button with an id of addTask.
 *
 * When the add button is clicked:
 *  - If the textbox is empty, generate an alert with the text “Error: Please enter a task first”.
 *  - If the text box is not empty, generate an alert with the text containing the task name. For example, if the text in the input box is “Complete Assignment”, generate an alert with text “New Task: Complete Assignment”.
 *  - Clear the text inside the text box after the add button is clicked.
 */

$(document).ready(function () {
	// code goes here
	$("#addTask").click(function () {
		const userInput = $("input").val();

		if (userInput) {
			alert(`New Task: ${userInput}.`);
			$("input").val("");

			const newItem = $(`<div class="task">${userInput}</div>`);
			const deleteBtn = $(`<button id="delete" class="fas fa-trash-alt" />`);
			const doneBtn = $(`<button id="done" class="fas fa-check" />`);
			newItem.append(deleteBtn, doneBtn);
			$(".notCompleted").append(newItem);

			doneBtn.click(function (e) {
				const taskItem = e.currentTarget.parentNode;
				e.currentTarget.remove();
				$(taskItem).fadeOut(1000);
				$(taskItem).clone(true).appendTo(".completed").hide().fadeIn(1000);
			});

			deleteBtn.click(function (e) {
				e.currentTarget.parentNode.remove();
			});
		} else {
			alert(`Error: Please enter a task first.`);
		}
	});
});
