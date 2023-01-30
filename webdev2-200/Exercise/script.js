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
		$(".notCompleted").append("<ol id='taskList'></ol>");

		if (userInput) {
			alert(`New Task: ${userInput}.`);
			$("input").val("");
			$("#taskList").append(`<li>${userInput}</li>`);
		} else {
			alert(`Error: Please enter a task first.`);
		}
	});
});
