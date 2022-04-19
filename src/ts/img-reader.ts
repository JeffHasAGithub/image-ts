type HTMLInput = HTMLInputElement;
type HTMLImage = HTMLImageElement;

class ImgReader {
	readonly _input: 	HTMLInput;
	readonly _reader: FileReader;
	readonly _imgrdy: CustomEvent;

	constructor(anchor: HTMLElement) {
		this._input = document.createElement("input");
		this._input.setAttribute("type", "file");
		anchor.appendChild(this._input);

		this._reader = new FileReader();	
		this._imgrdy = new CustomEvent("imgrdy");
		this.initListeners();
	}

	get image(): HTMLImage | null {
		if (!this._reader.result)
			return null;

		if (typeof this._reader.result !== "string") 
			return null;

		const image = new Image();
		image.src = this._reader.result;
		return image;
	}

	private initListeners() {
		this._input.addEventListener("input", () => {
			if (this._input.files)
				this._reader.readAsDataURL(this._input.files[0]);
		});

		this._reader.addEventListener("load", (ev) => {
			if (typeof this._reader.result === "string") 
				dispatchEvent(this._imgrdy);
		});
	}
}
export default ImgReader;
