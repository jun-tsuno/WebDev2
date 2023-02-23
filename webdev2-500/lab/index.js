window.addEventListener("load", revealAnimation);

function revealAnimation() {
	console.log("start");
	const TimeLine = gsap.timeline({
		defaults: {
			duration: 1,
			autoAlpha: 0,
			ease: "back",
		},
	});

	TimeLine.from(".logo", { x: -20 })
		.from(".menu-links ul li", { x: -20, stagger: 0.1 })
		.from(".title", { y: 20 }, "-=0.4")
		.from(".tagline", { y: 20 }, "-=0.7")
		.from(".desc", { y: 20 }, "<")
		.from(".beer", { y: -1000 })
		.to(
			".beer",
			{
				y: "-180",
				autoAlpha: 1,
				yoyo: true,
				repeat: -1,
				ease: "power1.inOut",
				duration: 2,
			},
			"+=0.1"
		);
}
