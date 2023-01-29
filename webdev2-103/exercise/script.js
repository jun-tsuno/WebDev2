const images = [
	"./images/avocado.jpeg",
	"./images/pancake.jpeg",
	"./images/sandwich.jpeg",
	"./images/spaghetti.jpeg",
];
let count = 0;

const img = document.querySelector("img");
const prevBtn = document.querySelector("#prev-button");
const nextBtn = document.querySelector("#next-button");

prevBtn.addEventListener("click", () => {
	if (count < 1) {
		count = images.length - 1;
		return (img.src = images[count]);
	} else {
		img.src = images[--count];
	}
});

nextBtn.addEventListener("click", () => {
	if (count < images.length - 1) {
		img.src = images[++count];
	} else {
		count = 0;
		return (img.src = images[count]);
	}
});

window.addEventListener("DOMContentLoaded", () => {
	img.src = images[count];
});
