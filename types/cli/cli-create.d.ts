declare const embeddableStrategy: {
	readonly type: 'list';
	readonly name: 'type';
	readonly message: 'When should your embeddable be triggered?';
	readonly choices: readonly [
		{
			readonly name: 'Should bundle as a Web Component';
			readonly value: 'webcomponent';
			readonly short: 'Web component';
		},
		{
			readonly name: 'On explicit call can be mounted only once';
			readonly value: 'embed';
			readonly short: 'Explicit call';
		},
		{
			readonly name: 'On explicit call can be mounted as much time as needed';
			readonly value: 'embedMultiple';
			readonly short: 'Explicit call w/ instances';
		},
		{
			readonly name: 'When downloaded automatically append it to target <div>';
			readonly value: 'autoEmbedWithTarget';
			readonly short: 'Auto-embed with target';
		},
		{
			readonly name: 'When downloaded automatically append to the <body>';
			readonly value: 'autoEmbedOnBody';
			readonly short: 'Auto-embed on body';
		}
	];
};
export type EmbeddableStrageies = (typeof embeddableStrategy.choices)[number]['value'];
export declare function generate(): Promise<void>;
export {};
