const listElement = document.querySelector(".posts");
const fetchButton = document.querySelector("#available-posts button");
const postTemplate = document.querySelector("template");
const addButton = document.querySelector("#new-post button");
const title = document.getElementById("title");
const content = document.getElementById("content");

async function sendHttpRequest(method, url) {
	//with XHR
	// const promise = new Promise((resolve, reject) => {
	//     const xhr = new XMLHttpRequest()
	//     xhr.open(method, url)
	//     xhr.onload = function(){
	//         if(xhr.status >= 200 && xhr.status < 300){
	//             //return the data back
	//             resolve(xhr.response)
	//         }else{
	//             reject("Something went wrong..... :<")
	//         }
	//     }
	//     xhr.send();
	// })

	// return promise

	//with fetch() function
	// const response = await fetch(url, {method})
	// const result = await response.json()
	// return result

	// return await fetch(url, {method}).then(r => r.json())

	//with axios
	const { data } = await axios(url, { method });
	return data;
	// return axios.get(url)
}

async function addPosts(e) {
	e.preventDefault();
	const inputTitle = title.value;
	const inputContent = content.value;

	if (inputTitle === "" || inputContent === "") {
		return alert("Fill in both fields!!");
	}

	const data = { userId: 1, title: inputTitle, body: inputContent };
	await axios
		.post("https://jsonplaceholder.typicode.com/posts", data)
		.then((res) => {
			const postedData = res.data;
			console.log(postedData);

			const postElClone = document.importNode(postTemplate.content, true);
			postElClone.querySelector(
				"h2"
			).textContent = `${postedData.title} : NEW!!`;
			postElClone.querySelector("p").textContent = postedData.body;
			postElClone.querySelector("li").id = postedData.id;
			listElement.appendChild(postElClone);
		})
		.catch((err) => {
			console.log(`error: ${err}`);
		});
	title.value = "";
	content.value = "";
}

async function fetchPosts() {
	const responseData = await sendHttpRequest(
		"GET",
		"https://jsonplaceholder.typicode.com/posts"
	);

	console.log(responseData);
	if (responseData.length > 0) {
		for (const post of responseData) {
			const postElClone = document.importNode(postTemplate.content, true);
			postElClone.querySelector("h2").textContent = post.title;
			postElClone.querySelector("p").textContent = post.body;
			postElClone.querySelector("li").id = post.id;
			listElement.appendChild(postElClone);
		}
	}
}

// POST
addButton.addEventListener("click", addPosts);
// READ/GET
fetchButton.addEventListener("click", fetchPosts);
