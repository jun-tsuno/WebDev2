/* JavaScript DOM Exercises 01 */

/*
  Exercise 01
  -----------
  Highlight all of the words over 8 characters long in the paragraph text (with a yellow background for example)
*/
const paragraph = document.querySelector("p");
const matchedWordsArr = paragraph.innerText.split(" ").map((word) => {
	if (word.length > 8) {
		return `<span style="background-color: yellow">${word}</span>`;
	} else {
		return word;
	}
});
paragraph.innerHTML = matchedWordsArr.join(" ");

/*
  Exercise 02
  -----------
  Add a link back to the source of the text after the paragraph tag.
  (http://officeipsum.com/)
*/

const newNode = document.createElement("a");
const textNode = document.createTextNode("http://officeipsum.com/");
newNode.appendChild(textNode);
paragraph.parentNode.insertBefore(newNode, paragraph.nextElementSibling);
newNode.href = "http://officeipsum.com/";
/*
  Exercise 03
  -----------
  Split each new sentence on to a separate line in the paragraph text.
  A sentence can be assumed to be a string of text terminated with a period (.)
*/

const terminatedSentenceArr = paragraph.innerHTML.split(".");
paragraph.innerHTML = terminatedSentenceArr.join(".<br/>");

/*
  Exercise 04
  -----------
  Count the number of words in the paragraph tag and display the count after the heading.
  You can assume that all words are separated by one singular whitespace.
*/

const count = paragraph.innerText.split(".").reduce((acc, cur) => {
	const eachSentenceWords = cur.split(" ").filter((word) => {
		return word !== "";
	}).length;
	return acc + eachSentenceWords;
}, 0);

const headingNode = document.querySelector("h1");
const countNode = document.createElement("h2");
const countTextNode = document.createTextNode(`${count} words`);
headingNode.parentNode.insertBefore(
	countNode.appendChild(countTextNode),
	headingNode.nextElementSibling
);

/*
  Exercise 05
  -----------
  Replace all question marks (?) with thinking faces (🤔) and exclamation marks (!) with astonished faces (😲)
*/

const wordsArr = paragraph.innerHTML.split(" ");

const newWordArr = wordsArr.map((word) => {
	if (word.includes("?")) {
		word = word.replace("?", "🤔");
	}
	if (word.includes("!")) {
		word = word.replace("!", "😲");
	}
	return word;
});
console.log(newWordArr);
paragraph.innerHTML = newWordArr.join(" ");
