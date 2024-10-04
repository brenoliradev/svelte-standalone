import type { ExampleProps } from './declarations';

export const defaultConfig: ExampleProps = {
	error: 'error!',
	info: 'info!',
	success: 'success!'
};

export interface CustomWindow extends Window {
	exampleStart(config: ExampleProps): void;
	exampleStop(): void;
}
