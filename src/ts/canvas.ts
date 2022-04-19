export type HTMLCanvas = HTMLCanvasElement;
export type Context2D = CanvasRenderingContext2D;

class Canvas {
	private readonly _element: HTMLCanvas;
	private readonly _context: Context2D;

	constructor(anchor: HTMLElement, w: number, h: number) {
		this._element = document.createElement("canvas");	
		this._element.width = w;
		this._element.height = h;
		anchor.appendChild(this._element);

		this._context = this._element.getContext("2d")!;
	}

	get element() {
		return this._element;
	}

	get context() {
		return this._context;
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
