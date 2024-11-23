/**
 * Generates a Storybook story file for a given component.
 *
 * @param {string} componentName - The name of the component.
 * @param {string} strategy - The strategy for generating the file.
 */
export function generateStoryFile(componentName: string, strategy: string): Promise<void>;
/**
 * Generates embed files for a given component.
 *
 * @param {string} componentName - The name of the component.
 * @param {string} embedType - The type of embed (e.g., inline, script).
 * @param {string | undefined} strategy- The strategy for generating the file.
 */
export function generateEmbedFiles(
	componentName: string,
	embedType: string,
	strategy: any
): Promise<void>;
/**
 * Generates type declaration files for a given component.
 *
 * @param {string} componentName - The name of the component.
 * @param {string} embedType - The type of embed (e.g., inline, script).
 */
export function generateTypesFile(componentName: string, embedType: string): Promise<void>;
/**
 * Generates route files for a given component and appends a link to the routes page.
 *
 * @param {string} componentName - The name of the component.
 * @param {string} strategy - The strategy for generating the file.
 */
export function generateRoutesFile(componentName: string, strategy: string): Promise<void>;
/**
 * Generates a Svelte file for a given component.
 *
 * @param {string} componentName - The name of the component.
 */
export function generateSvelteFile(componentName: string): Promise<void>;
