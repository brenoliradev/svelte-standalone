import type { TestProps } from "./declarations";

export const defaultConfig: TestProps = {
	error: 'error!',
	info: 'info!',
	success: 'success!'
};

export interface CustomWindow extends Window {
	testStart(config: TestProps): void;
	testStop(): void;
}