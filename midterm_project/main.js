const itemsList = $("#items-list");
const cartList = $("#cart-list");
const cardTemplate = $("#card-temp").html();
const cartTemplate = $("#cart-temp").html();

const cartItems = [];

const handleAdd = (e) => {
	const clickedParent = e.target.parentElement;
	const addTitle = $(clickedParent).find(".card-title").text();
	const addPrice = $(clickedParent).find(".card-price").text();
	const clonedCartTemplate = $(cartTemplate).clone(true);
	const data = { title: addTitle, price: addPrice };

	axios({
		method: "POST",
		url: "https://run.mocky.io/v3/4d89e4c9-4108-41c8-814e-554d5ac7bc7e",
		data,
	}).then((response) => {
		const addedItem = JSON.parse(response.config.data);
		cartItems.push(addedItem);

		$(clonedCartTemplate).find(".add-title").text(addedItem.title);
		$(clonedCartTemplate).find(".add-price").text(addedItem.price);

		console.log(clonedCartTemplate);
		$(cartList).after(clonedCartTemplate);
	});
};

$(document).ready(async () => {
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
