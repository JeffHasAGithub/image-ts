import Canvas from "./canvas"
import { Pixel, RGBA } from "./pixel"
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

	const test = canvas.context.getImageData(0, 0, ireader.image.width, ireader.image.height);
	const data = new ImageData(ireader.image.width, ireader.image.height);

	const pixels: Pixel[] = [];
	for (let i = 0; i < test.data.length;) {
		const rgba: RGBA = [0, 0, 0, 0];

		let j;
		for (j = 0;j < rgba.length; ++j) {
			rgba[j] = test.data[i + j];
		}

		pixels.push(new Pixel(rgba));
		i += j;
	}

	console.log(pixels);
});

