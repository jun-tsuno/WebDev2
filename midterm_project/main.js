const itemsList = $("#items-list");
const cartList = $("#cart-list");
const cardTemplate = $("#card-temp").html();
const cartTemplate = $("#cart-temp").html();

const handleAdd = (e) => {
	const clickedParent = e.target.parentElement;
	const addTitle = $(clickedParent).find(".card-title").text();
	const addPrice = $(clickedParent).find(".card-price").text();

	console.log(cartTemplate);
	$(cartList).after(cartTemplate);
};

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
			$(".add-button").on("click", handleAdd);
		})
		.catch((error) => console.log(error));
});
