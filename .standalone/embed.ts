// default with import/export
export function embed(mount: any, name: string) {
	function start<T>(props: T) {
		let div = document.getElementById(name);

		if (!div) {
			div = document.createElement('div');
			div.id = name;
			document.body.appendChild(div);
		}

		new (mount as any)({
			// TODO: revaluate this type
			target: div,
			props: props
		});
	}

	function stop() {
		const div = document.getElementById(name);

		if (div) {
			div.remove();
		}
	}

	window[name] = {
		start,
		stop
	};
}

export const autoEmbedWithTarget = (mount: any) =>
	new mount({
		target: document.getElementById(
			new URL((document.currentScript as HTMLScriptElement).src).searchParams.get('target')!
		)
	});

export function autoEmbedOnBody(mount: any, name: string) {
	let div = document.getElementById(name);

	if (!div) {
		div = document.createElement('div');
		div.id = name;
		document.body.appendChild(div);
	}

	new (mount as any)({
		// TODO: revaluate this type
		target: div,
	});
}