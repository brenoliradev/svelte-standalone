import { EmbeddableStrageies } from "./cli-create";
import { generateFiles } from "./generate-stories.mjs";

export const create = (componentName: string, type: EmbeddableStrageies) => {
    generateFiles(componentName, 'story');

    generateFiles(componentName, 'embed', type, type === 'autoEmbedWithTarget' ? 'embed-with-target' : 'embed');

    generateFiles(componentName, 'types');

    generateFiles(componentName, 'routes');
    
    generateFiles(componentName, 'svelte');
}
