import Example from './index.svelte';
import { type ConfigProps } from './types';

function exampleStart(config: ConfigProps) {
	let div = document.getElementById('example-root');

	if (div) {
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
		// Instantiate the Example component with configurations
		new Example({
			target: div,
			props: config ? { config } : {}
		});
	} catch (error) {
		console.error('Failed to initialize example:', error);
	}
}

function exampleStop() {
	const div = document.getElementById('example-root');

	if (div) {
		div.remove();
	}
}

type CustomWindow = Window & { exampleStart: (config: ConfigProps) => void; exampleStop: () => void };

// Expose the function globally
(window as unknown as CustomWindow).exampleStart = exampleStart;
(window as unknown as CustomWindow).exampleStop = exampleStop;
