import { EmbeddableStrageies } from "./cli-create";
import { generateFiles } from "./generate-stories.mjs";

const TYPE_TO_ROUTE: { [key in EmbeddableStrageies]: string } = {
    autoEmbedOnBody: 'route-auto-start',
    autoEmbedWithTarget: 'route-with-target',
    embed: 'route-callable'
}

export const create = (componentName: string, type: EmbeddableStrageies) => {
    generateFiles(componentName, 'story');

    generateFiles(componentName, 'embed', type, type === 'autoEmbedWithTarget' ? 'embed-with-target' : 'embed');

    if (type === 'embed') {
        generateFiles(componentName, 'types');
    }

    generateFiles(componentName, 'routes', undefined, TYPE_TO_ROUTE[type]);
    
    generateFiles(componentName, 'svelte');
}
