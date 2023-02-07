const itemsList = $("#items-list");
const cartList = $("#cart-list");
const cardTemplate = $("#card-temp").html();
const cartTemplate = $("#cart-temp").html();
const addAlert = $("#add-alert").html();

let cartItems = [];

const handleDelete = (e) => {
	$(e.target.parentElement).remove();

	const newCartItems = cartItems.filter((item) => {
		return item.id !== Number(e.target.parentElement.getAttribute("data-id"));
	});
	cartItems = newCartItems;
	counter();
};

const handleAdd = async (e) => {
	const clickedParent = e.target.parentElement;
	const clonedCartTemplate = $(cartTemplate).clone(true);

	const addTitle = $(clickedParent).find(".card-title").html();
	const addPrice = $(clickedParent).find(".card-price").html();
	const dataId = Math.random();
	const data = { id: dataId, title: addTitle, price: parseInt(addPrice) };

	await axios
		.post("https://run.mocky.io/v3/4d89e4c9-4108-41c8-814e-554d5ac7bc7e", data)
		.then((res) => {
			const addedItem = JSON.parse(res.config.data);
			cartItems.push(addedItem);

			$(clonedCartTemplate).find(".add-title").html(addedItem.title);
			$(clonedCartTemplate).find(".add-price").html(`$ ${addedItem.price}`);
			$(clonedCartTemplate).attr("data-id", dataId);
			$(cartList).after(clonedCartTemplate);
			counter();
		});
};

const counter = () => {
	$("#cart-badge").html(cartItems.length);
	$("#item-count").html(cartItems.length);
	$("#item-total").html(
		cartItems.reduce((pre, curr) => {
			return pre + curr.price;
		}, 0)
	);
};

$(document).ready(async () => {
	$(itemsList).append($("#spinner-temp").html());
	await axios
		.get("https://fakestoreapi.com/products?limit=15")
		.then(({ data }) => {
			if (data.length > 0) {
				data.map((ele) => {
					const clonedCard = $(cardTemplate).clone(true);
					$(clonedCard).find(".card-img-top").attr("src", ele.image);
					$(clonedCard).find(".card-title").text(ele.title);
					$(clonedCard).find(".card-price").text(ele.price);
					$("#spinner").remove();
					$(clonedCard).appendTo(itemsList);
				});
			}
			$(".add-button").on("click", handleAdd);
		})
		.catch((error) => console.log(error));
	counter();
});

$(".delete-button").on("click", handleDelete);
