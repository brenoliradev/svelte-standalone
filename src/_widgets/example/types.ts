export type ConfigProps = {
	error: string;
	success: string;
	info: string;
};

export const defaultConfig: ConfigProps = {
	error: 'error!',
	success: 'success!',
	info: 'info!'
};

export type CustomWindow = Window & {
	exampleStart: (config: ConfigProps) => void;
	exampleStop: () => void;
};
