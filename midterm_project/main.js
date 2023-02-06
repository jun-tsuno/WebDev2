const itemsList = $("#items-list");
const cardTemplate = $("#card-temp").html();
const myModal = document.getElementById("myModal");
const myInput = document.getElementById("myInput");

$(document).ready(async () => {
	// const items = await axios.get("https://fakestoreapi.com/products?limit=5");
	// console.log(items);

	// if (items.data.length > 0) {
	// 	items.data.map((item) => {
	// 		const clonedCard = $(cardTemplate).clone(true);
	// 		$(clonedCard).find(".card-title").html(item.title);
	// 		$(clonedCard).find(".card-img-top").attr("src", item.image);
	// 		$(clonedCard).appendTo(itemsList);
	// 	});
	// }

	await axios
		.get("https://fakestoreapi.com/products?limit=15")
		.then(({ data }) => {
			if (data.length > 0) {
				data.map((ele) => {
					const clonedCard = $(cardTemplate).clone(true);
					$(clonedCard).find(".card-img-top").attr("src", ele.image);
					$(clonedCard).find(".card-title").html(ele.title);
					$(clonedCard).find(".card-price").html(`$ ${ele.price}`);
					$(clonedCard).appendTo(itemsList);
				});
			}
		})
		.catch((error) => console.log(error));
});

myModal.addEventListener("shown.bs.modal", () => {
	myInput.focus();
});
