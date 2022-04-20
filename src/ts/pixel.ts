export type RGBA = [number, number, number, number];

export class Pixel {
	private readonly _rgba: RGBA;

	constructor(rgba: RGBA) {
		this._rgba = rgba;
		this.set(rgba);
	}

	get() {
		return [...this._rgba] as RGBA;
	}

	set(rgba: RGBA) {
		for (let i = 0; i < rgba.length; ++i) {
			if (rgba[i] > 255) {
				rgba[i] = 255;
				continue;
			}

			if (rgba[i] < 0) {
				rgba[i] = 0;
				continue;
			}

			this._rgba[i] = rgba[i];
		}
	}

	get length() {
		return this._rgba.length;
	}
}

export default Pixel;
