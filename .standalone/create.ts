import { EmbeddableStrageies } from "./cli-create";
import { generateFiles } from "./generate-stories.mjs";

const TYPE_TO_ROUTE: { [key in EmbeddableStrageies]: string } = {
    autoEmbedOnBody: 'route-auto-start',
    autoEmbedWithTarget: 'route-with-target',
    embed: 'route-callable'
}

const TYPE_TO_STORY: { [key in EmbeddableStrageies]: string } = {
    autoEmbedOnBody: 'store-no-config',
    autoEmbedWithTarget: 'store-no-config',
    embed: 'store-with-config'
}

export const create = (componentName: string, type: EmbeddableStrageies) => {
    generateFiles(componentName, 'story', undefined, TYPE_TO_STORY[type]);

    generateFiles(componentName, 'embed', type, type === 'autoEmbedWithTarget' ? 'embed-with-target' : 'embed');

    if (type === 'embed') {
        generateFiles(componentName, 'types');
    }

    generateFiles(componentName, 'routes', undefined, TYPE_TO_ROUTE[type]);
    
    generateFiles(componentName, 'svelte');
}
