const TYPE_TO_ROUTE = {
	autoEmbedOnBody: 'route-auto-start',
	autoEmbedWithTarget: 'route-with-target',
	embed: 'route-callable',
	embedMultiple: 'route-multiple',
	webcomponent: 'route-web-component'
};
const TYPE_TO_STORY = {
	autoEmbedOnBody: 'story-no-config',
	autoEmbedWithTarget: 'story-no-config',
	embed: 'story-with-config',
	embedMultiple: 'story-with-config',
	webcomponent: 'story-with-config'
};
const TYPE_TO_TYPESCRIPT = {
	autoEmbedOnBody: undefined,
	autoEmbedWithTarget: undefined,
	embed: 'types',
	embedMultiple: 'types-multiple',
	webcomponent: 'types-web-component'
};
const TYPE_TO_EMBED = {
	autoEmbedOnBody: 'embed',
	autoEmbedWithTarget: 'embed-with-target',
	embed: 'embed',
	embedMultiple: 'embed',
	webcomponent: 'embed-web-component'
};
export { TYPE_TO_EMBED, TYPE_TO_ROUTE, TYPE_TO_TYPESCRIPT, TYPE_TO_STORY };
