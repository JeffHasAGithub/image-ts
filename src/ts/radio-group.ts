type HTMLForm = HTMLFormElement;
type HTMLInput = HTMLInputElement;

class RadioGroup {
	private readonly _form: HTMLForm;
	private readonly _name: string;

	constructor(anchor: HTMLElement, name: string, vals: string[]) {
		this._form = document.createElement("form")!;
		this._name = name;
		anchor.appendChild(this._form);

		this.add(...vals);
	}

	add(...vals: string[]) {
		for (let val of vals) {
			const div = document.createElement("div");

			const input = document.createElement("input");
			input.type = "radio";
			input.name = this._name;
			input.value =  val;
			div.appendChild(input);

			const label = document.createElement("label");
			label.setAttribute("for", val);
			label.innerText = val;
			div.appendChild(label);

			this._form.appendChild(div);
		}
	}

	get(val: string): HTMLInput | null {
		const buttons = Array.from(this._form.children) as HTMLInput[];
		for (let button of buttons) {
			const input = button.firstElementChild as HTMLInput;
			if (input)
				if (input.value === val)
					return input;
		}

		return null;
	}
}

export default RadioGroup;
