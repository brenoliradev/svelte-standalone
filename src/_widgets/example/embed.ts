import Example from './example.svelte';
import { type ConfigProps } from './types';

let exampleInitialized = false;
let div = document.getElementById('example-root');

function exampleStart(config: ConfigProps) {
	if (exampleInitialized) {
		console.warn('example is already initialized.');
		return;
	}

	// Create a div element only if it doesn't already exist
	if (!div) {
		div = document.createElement('div');
		div.id = 'example-root';
		document.body.appendChild(div);
	}

	try {
		// Instantiate the example component with configurations
		new Example({
			target: div,
			props: config ? { config } : {}
		});
		exampleInitialized = true;
	} catch (error) {
		console.error('Failed to initialize example:', error);
	}
}

function exampleStop() {
	if (div) {
		div.remove();
		exampleInitialized = false;
	}
}

type CustomWindow = Window & {
	exampleStart: (config: ConfigProps) => void;
	exampleStop: () => void;
};

// Expose the function globally
(window as unknown as CustomWindow).exampleStart = exampleStart;
(window as unknown as CustomWindow).exampleStop = exampleStop;
