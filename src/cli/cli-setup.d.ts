declare const shouldInclude: {
    readonly type: "checkbox";
    readonly name: "support";
    readonly message: "What do you want for your embedabble?";
    readonly choices: readonly [{
        readonly name: "Storybook";
        readonly value: "storybook";
        readonly short: "Storybook";
    }, {
        readonly name: "Routes";
        readonly value: "routes";
        readonly short: "Routes";
    }, {
        readonly name: "Tailwind";
        readonly value: "tailwind";
        readonly short: "Tailwind";
    }, {
        readonly name: "Vitest";
        readonly value: "vitest";
        readonly short: "Vitest";
    }];
};
export type Support = (typeof shouldInclude.choices)[number]['value'];
export declare function setup(): Promise<void>;
export {};
