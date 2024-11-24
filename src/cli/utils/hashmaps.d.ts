import { EmbeddableStrageies } from '../cli-create.js';
declare const TYPE_TO_ROUTE: {
    [key in EmbeddableStrageies]: string;
};
declare const TYPE_TO_STORY: {
    [key in EmbeddableStrageies]: string;
};
declare const TYPE_TO_TYPESCRIPT: {
    [key in EmbeddableStrageies]?: string;
};
declare const TYPE_TO_EMBED: {
    [key in EmbeddableStrageies]?: string;
};
export { TYPE_TO_EMBED, TYPE_TO_ROUTE, TYPE_TO_TYPESCRIPT, TYPE_TO_STORY };
