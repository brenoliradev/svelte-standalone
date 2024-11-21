// default with import/export
export function embed(mount: any, name: string) {
	function start<T>(props: T) {
		let div = document.getElementById(name);
	
		if (div) {
			console.warn('example is already initialized.');
			return;
		}
	
		// Create a div element only if it doesn't already exist
		if (!div) {
			div = document.createElement('div');
			div.id = name;
			document.body.appendChild(div);
		}
	
		try {
			// Instantiate the component with props
			new (mount as any)({ // TODO: revaluate this type 
				target: div,
				props: props
			});
		} catch (error) {
			console.error('Failed to initialize example:', error);
		}
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
	}
}

// with searchParams
export const embedWithParams = (mount: any) => (() => {
	try {
		new mount({
			target: document.getElementById(new URL((document.currentScript as HTMLScriptElement).src).searchParams.get('target')!),
		});
	} catch (error) {
		console.error('Failed to initialize your embeddable:', error);
	}
})();
