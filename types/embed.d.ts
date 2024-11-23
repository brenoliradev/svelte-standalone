declare global {
	interface Window {
		[key: string]: any;
	}
}
export declare function embed<T>(m: T, n: string): void;
export declare function embedMultiple(m: any, n: string): void;
export declare const autoEmbedWithTarget: (mount: any) => void;
export declare const autoEmbedOnBody: (m: any, n: string) => void;
