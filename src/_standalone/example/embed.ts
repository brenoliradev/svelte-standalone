import { type CustomWindow } from './types';

import Example from './index.svelte';
import type { ExampleProps } from './declarations';

function exampleStart(props: ExampleProps) {
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
			props
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

// Expose the function globally
(window as unknown as CustomWindow).exampleStart = exampleStart;
(window as unknown as CustomWindow).exampleStop = exampleStop;
