// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StorybookProps<T> = T extends undefined ? any : { config: T };
