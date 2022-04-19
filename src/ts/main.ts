import Canvas from "./canvas"
import Pixel from "./pixel"
import ImgReader from "./img-reader" 

const canvas = new Canvas(document.body, 800, 600);
const ireader = new ImgReader(document.body);

canvas.element.style.setProperty("border", "1px solid black");

const grayscBtn = document.createElement("button");
grayscBtn.innerText = "Grayscale";
document.body.appendChild(grayscBtn);

window.addEventListener("imgrdy", (ev) => {
	if (!ireader.image)
		return;

	canvas.resize(ireader.image.width, ireader.image.height);
	canvas.addImage(ireader.image, 0, 0);
});

grayscBtn.addEventListener("click", (_) => {
	if (!ireader.image)
		return;

	const pixels = canvas.pixels;
	pixels.fill(new Pixel([255, 0, 0, 255]), 0)
	canvas.pixels = pixels;
});

