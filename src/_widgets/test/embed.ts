import { type CustomWindow } from './types';

import Test from './index.svelte'
import type { TestProps } from './declarations';

function testStart(props: TestProps) {
	let div = document.getElementById('test-root');

	if (div) {
		console.warn('test is already initialized.');
		return;
	}

	// Create a div element only if it doesn't already exist
	if (!div) {
		div = document.createElement('div');
		div.id = 'test-root';
		document.body.appendChild(div);
	}

	try {
		// Instantiate the Test component with configurations
		new Test({
			target: div,
			props
		});
	} catch (error) {
		console.error('Failed to initialize test:', error);
	}
}

function testStop() {
	const div = document.getElementById('test-root');

	if (div) {
		div.remove();
	}
}

// Expose the function globally
(window as unknown as CustomWindow).testStart = testStart;
(window as unknown as CustomWindow).testStop = testStop;
