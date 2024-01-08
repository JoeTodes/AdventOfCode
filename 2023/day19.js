class Player {
	constructor(x, y, speedX, speedY) {
		this.x = x;
		this.y = y;
		this.speedX = speedX;
		this.speedY = speedY;
	}

	draw() {
		// Draw the player as a circle using p5.js functions
		fill(255); // Set the fill color to white
		circle(this.x, this.y, 20); // Draw a circle at the player's position with a radius of 20
	}

	update() {
		// Update the player's position based on the speed
		this.x += this.speedX;
		this.y += this.speedY;
	}
}
