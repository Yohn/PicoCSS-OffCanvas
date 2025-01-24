class OffCanvas {
	constructor(trigger) {
		this.trigger = trigger;
		this.target = document.querySelector(trigger.dataset.offcanvasTarget);
		this.direction = trigger.dataset.direction || "right";
		this.url = trigger.dataset.url || null;
		this.backdrop = trigger.dataset.backdrop === "true";
		this.scrollLock = trigger.dataset.scrollLock === "true";
		this.push = trigger.dataset.push === "true";
		this.addBackdrop = false;
		this.backdropElement = null;

		this.init();
	}

	init() {
		// Find the target based on the data attribute
		this.target = document.querySelector(this.trigger.dataset.offcanvasTarget);

		// If target is null, log an error and return
		if (!this.target) {
			console.error(`Offcanvas target not found for trigger:`, this.trigger);
			return;
		}

		// Ensure all offcanvas elements are hidden on page load
		this.target.classList.remove('open');

		// Event listeners
		this.trigger.addEventListener('click', () => this.open());
		this.target.querySelector('.offcanvas-close').addEventListener('click', () => this.close());

		if (this.url) {
			this.loadContentFromURL();
		}
	}

	open() {
		// Set the correct direction for the offcanvas
		this.target.dataset.direction = this.direction;
		this.target.classList.add("open");
		this.target.setAttribute("aria-hidden", "false");

		this.target.classList.add('open');
		document.body.classList.add('offcanvas-open');


		if (this.backdrop) {
			this.createBackdrop();
		}

		if (this.push) {
			this.pushContent();
		}

		if (this.scrollLock) {
			document.body.style.overflow = "hidden";
		}

		document.dispatchEvent(
			new CustomEvent("offcanvas:opened", { detail: this.target })
		);

		this.target.classList.add('open');
		document.body.classList.add('offcanvas-open');
	}

	close() {
		// Add transition before removing open class
		if (this.push) {
			this.resetContent();
			// Wait for the transition to complete before removing classes
			setTimeout(() => {
				this.target.classList.remove("open");
				this.target.setAttribute("aria-hidden", "true");
				document.body.classList.remove('offcanvas-open');
			}, 300); // Match the transition duration
		} else {
			this.target.classList.remove("open");
			this.target.setAttribute("aria-hidden", "true");
			document.body.classList.remove('offcanvas-open');
		}

		if (this.scrollLock) {
			document.body.style.overflow = "";
		}

		this.removeBackdrop();

		document.dispatchEvent(
			new CustomEvent("offcanvas:closed", { detail: this.target })
		);
	}

	loadContentFromURL() {
		fetch(this.url)
			.then((response) => response.text())
			.then((content) => {
				this.target.querySelector(".offcanvas-body").innerHTML = content;
				document.dispatchEvent(
					new CustomEvent("offcanvas:contentLoaded", { detail: this.target })
				);
			})
			.catch((error) => console.error("Error loading content:", error));
	}

	createBackdrop() {
		if (this.addBackdrop == false && this.backdropElement == null) {
			this.addBackdrop = true;
			this.backdropElement = document.createElement("div");
			this.backdropElement.className = "offcanvas-backdrop";
			document.body.appendChild(this.backdropElement);
			this.backdropElement.style.opacity = 1;
			this.backdropElement.addEventListener("click", () => this.close());
			this.addBackdrop = false;
		}
	}

	removeBackdrop() {
		if (this.backdropElement) {
			console.log("Backdrop found");

			// Fade out the backdrop before removing it
			this.backdropElement.style.transition = "opacity 0.3s";
			this.backdropElement.style.opacity = '0';

			// Wait for the transition to complete before removing the element
			this.backdropElement.addEventListener("transitionend", () => {
				setTimeout(() => {
					this.backdropElement.style.opacity = '0';
					this.backdropElement.style.width = '0px';
					this.backdropElement.style.height = '0px';
					this.backdropElement.style.zIndex = '-100';
					//this.backdropElement.className = '';
					this.backdropElement.remove();
					this.backdropElement = null;
					console.log("Backdrop removed");
				}, 500);
			}, { once: true });
		} else {
			console.log("Backdrop element not found");
		}
	}

	pushContent() {
		const width = this.target.offsetWidth;
		const height = this.target.offsetHeight;

		if (this.direction === "right") {
			let width2 = width * 2;
			this.target.style.right = `-${width2}px`;
			document.body.style.transform = `translateX(-${width}px)`;
		} else if (this.direction === "left") {
			let width2 = width * 2;
			this.target.style.left = `-${width2}px`;
			document.body.style.transform = `translateX(${width}px)`;
		} else if (this.direction === "top") {
			let height2 = height * 2;
			this.target.style.top = `-${height2}px`;
			document.body.style.transform = `translateY(${height}px)`;
		} else if (this.direction === "bottom") {
			let height2 = height * 2;
			this.target.style.bottom = `-${height2}px`;
			document.body.style.transform = `translateY(-${height}px)`;
		}

		document.body.style.transition = "transform 0.3s ease-in-out";
	}

	resetContent() {
		// Reset transform with transition
		document.body.style.transition = "transform 0.3s ease-in-out";
		document.body.style.transform = "translateX(0)";
		// Clean up transition style after animation completes
		setTimeout(() => {
			document.body.style.transition = "";
		}, 300);
	}
}

// Initialize all triggers
//document.querySelectorAll(".offcanvas-trigger").forEach((trigger) => new OffCanvas(trigger));
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.offcanvas-trigger').forEach(trigger => {
		const offcanvas = new OffCanvas(trigger);
		offcanvas.init();
	});
});