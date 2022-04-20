import Canvas from "./canvas"
import ImgReader from "./img-reader" 

const canvas = new Canvas(document.body, 800, 600);
const ireader = new ImgReader(document.body);

window.addEventListener("imgrdy", (ev) => {
	if (!ireader.image)
		return;

	canvas.resize(ireader.image.width, ireader.image.height);
	canvas.addImage(ireader.image, 0, 0);
});

const grayscBtn = document.createElement("button");
grayscBtn.innerText = "Grayscale";
document.body.appendChild(grayscBtn);

grayscBtn.addEventListener("click", (_) => {
	if (!ireader.image)
		return;

	const pixels = canvas.pixels;
	for (let pixel of pixels) {
		const rgba = pixel.get();
		const avg = (rgba[0] + rgba[1] + rgba[2]) / 3;
		pixel.set([avg, avg, avg, avg]);
	}
		
	canvas.pixels = pixels;
});

const invertBtn = document.createElement("button");
invertBtn.innerText = "Invert";
document.body.appendChild(invertBtn);

invertBtn.addEventListener("click", (_) => {
	if (!ireader.image)
		return;

	const pixels = canvas.pixels;
	for (let pixel of pixels) {
		const rgba = pixel.get();
		rgba[0] = 255 - rgba[0];
		rgba[1] = 255 - rgba[1];
		rgba[2] = 255 - rgba[2];
		pixel.set(rgba);
	}

	canvas.pixels = pixels;
});
