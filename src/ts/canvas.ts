import { Pixel, RGBA } from "./pixel"

export type HTMLCanvas = HTMLCanvasElement;
export type Context2D = CanvasRenderingContext2D;

class Canvas {
	private readonly _element: HTMLCanvas;
	private readonly _context: Context2D;

	constructor(anchor: HTMLElement, w: number, h: number) {
		this._element = document.createElement("canvas");	
		this._element.width = w;
		this._element.height = h;
		this._element.style.border = "1px solid black";
		anchor.appendChild(this._element);

		this._context = this._element.getContext("2d")!;
	}

	get element(): HTMLCanvas {
		return this._element;
	}

	get context(): Context2D {
		return this._context;
	}

	get pixels(): Pixel[] {
		const buffer = this._context.getImageData(0, 0, this._element.width, this._element.height);

		const pixels: Pixel[] = [];
		for (let i = 0; i < buffer.data.length;) {
			const pixel: RGBA = [0, 0, 0, 0];

			let j;
			for (j = 0;j < pixel.length; ++j)
				pixel[j] = buffer.data[i + j];

			pixels.push(new Pixel(pixel));
			i += j;
		}

		return pixels;
	}

	set pixels(pixels: Pixel[]) {
		const w = this._element.width;
		const h = this._element.height;
		const buffer = this._context.createImageData(w, h);

		let offset = 0;
		for (let i = offset; i < pixels.length; ++i) {
			const pixel = pixels[i].get();

			let j;
			for (j = 0;j < pixel.length; ++j) {
				buffer.data[offset + j] = pixel[j];
			}

			offset += j
		}

		this._context.putImageData(buffer, 0, 0);
	}

	resize(w: number, h: number) {
		this._element.width = w;
		this._element.height = h;
	}

	addImage(img: HTMLImageElement, x: number, y: number) {
		this._context.drawImage(img, x, y);
	}

}

export default Canvas;
