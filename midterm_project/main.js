const itemsList = $("#items-list");
const cartList = $("#cart-list");
const cardTemplate = $("#card-temp").html();
const cartTemplate = $("#cart-temp").html();
const addAlert = $("#add-alert").html();

const cartItems = [];

const handleAdd = async (e) => {
	const clickedParent = e.target.parentElement;
	console.log(clickedParent);
	const clonedCartTemplate = $(cartTemplate).clone(true);
	const addTitle = $(clickedParent).find(".card-title").html();
	const addPrice = $(clickedParent).find(".card-price").html();
	const data = { title: addTitle, price: parseInt(addPrice) };

	await axios
		.post("https://run.mocky.io/v3/4d89e4c9-4108-41c8-814e-554d5ac7bc7e", data)
		.then((res) => {
			const addedItem = JSON.parse(res.config.data);
			cartItems.push(addedItem);

			$(clonedCartTemplate).find(".add-title").html(addedItem.title);
			$(clonedCartTemplate).find(".add-price").html(addedItem.price);
			$(cartList).after(clonedCartTemplate);
			countAdd();
		});
};

const countAdd = () => {
	$("#cart-badge").html(cartItems.length);
	$("#item-count").html(cartItems.length);
	$("#item-total").html(
		cartItems.reduce((pre, curr) => {
			return pre + curr.price;
		}, 0)
	);
};

$(document).ready(async () => {
	await axios
		.get("https://fakestoreapi.com/products?limit=15")
		.then(({ data }) => {
			if (data.length > 0) {
				data.map((ele) => {
					const clonedCard = $(cardTemplate).clone(true);
					$(clonedCard).find(".card-img-top").attr("src", ele.image);
					$(clonedCard).find(".card-title").text(ele.title);
					$(clonedCard).find(".card-price").text(ele.price);
					$(clonedCard).appendTo(itemsList);
				});
			}
			$(".add-button").on("click", handleAdd);
		})
		.catch((error) => console.log(error));

	countAdd();
});
