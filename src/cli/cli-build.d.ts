export declare const buildStrategy: {
    readonly type: "checkbox";
    readonly name: "components";
    readonly message: "Which components should be builded?";
    readonly choices: readonly ({
        name: string | undefined;
        value: string | undefined;
        checked: boolean;
    } | {
        name: string | undefined;
        value: string | undefined;
        checked: boolean;
    })[];
};
export type BuildStrageies = (typeof buildStrategy.choices)[number]['value'];
export declare function build(): Promise<void>;
