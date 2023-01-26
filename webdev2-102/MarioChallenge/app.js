let count = 0;
let maxHeight = 0;
let maxWidth = 0;
const body = document.querySelector("body");
const coin = document.getElementById("coin");
const footSound = "./audio/smw_footstep.wav";
const coinSound = "./audio/smw_coin.wav";

function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

const init = () => {
	//get the avatar
	const avatar = document.querySelector("#avatar");
	//get the coin
	const coin = document.querySelector("#coin");
	// get window size
	maxWidth = window.innerWidth;
	maxHeight = window.innerHeight;
	// create counter
	const counter = document.createElement("h1");
	const button = document.createElement("button");
	counter.innerText = `Total: ${count}`;
	button.innerText = "RESET";
	body.insertBefore(counter, body.firstChild);
	body.insertBefore(button, counter.nextSibling);

	moveCoin();
	window.addEventListener("keyup", function (e) {
		if (e.key === "ArrowDown" || e.key === "Down") {
			moveVertical(avatar, 50);
		} else if (e.key === "ArrowUp" || e.key === "Up") {
			moveVertical(avatar, -50);
		} else if (e.key === "ArrowRight" || e.key === "Right") {
			moveHorizontal(avatar, 50);
			avatar.style.transform = "scaleX(1)";
		} else if (e.key === "ArrowLeft" || e.key === "Left") {
			moveHorizontal(avatar, -50);
			avatar.style.transform = "scaleX(-1)";
		}

		if (isTouching(avatar, coin)) {
			moveCoin();
			handleCoinSound();
			counter.innerText = `Total: ${++count}`;
		}
	});

	button.addEventListener("click", () => {
		count = 0;
		counter.innerText = `Total: ${count}`;
	});
};

const moveVertical = (element, amount) => {
	const currTop = extractPos(element.style.top);
	const nextTop = currTop + amount;
	if (nextTop > 0 && nextTop < maxHeight) {
		element.style.top = `${nextTop}px`;
		handleFootSound();
	}
};

const moveHorizontal = (element, amount) => {
	const currLeft = extractPos(element.style.left);
	const nextLeft = currLeft + amount;
	if (nextLeft > 0 && nextLeft < maxWidth) {
		element.style.left = `${currLeft + amount}px`;
		handleFootSound();
	}
};

const extractPos = (position) => {
	if (!position) return 100;
	return parseInt(position.slice(0, -2));
};

const moveCoin = () => {
	const x = Math.floor(Math.random() * window.innerWidth);
	const y = Math.floor(Math.random() * window.innerHeight);
	x < 100 ? (coin.style.left = `${x}px`) : (coin.style.left = `${x - 100}px`);
	y < 100 ? (coin.style.top = `${y}px`) : (coin.style.top = `${y - 100}px`);
};

const handleFootSound = () => {
	const audio = document.createElement("audio");
	audio.id = "foot-sound";
	audio.src = footSound;
	document.body.appendChild(audio);
	document.getElementById("foot-sound").play();
};

const handleCoinSound = () => {
	const audio = document.createElement("audio");
	audio.id = "coin-sound";
	audio.src = coinSound;
	document.body.appendChild(audio);
	document.getElementById("coin-sound").play();
};

init();
