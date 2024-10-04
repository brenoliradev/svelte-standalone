import type { ExampleProps } from './declarations';

export const defaultConfig: ExampleProps = {};

export interface CustomWindow extends Window {
	exampleStart(config: ExampleProps): void;
	exampleStop(): void;
}
