const TYPE_TO_ROUTE = {
	autoEmbedOnBody: 'route-auto-start',
	autoEmbedWithTarget: 'route-with-target',
	autoEmbedMultiple: 'route-with-class',
	embed: 'route-callable',
	embedMultiple: 'route-multiple'
} as const;

const TYPE_TO_STORY = {
	autoEmbedOnBody: 'story-no-config',
	autoEmbedWithTarget: 'story-no-config',
	autoEmbedMultiple: 'story-no-config',
	embed: 'story-with-config',
	embedMultiple: 'story-with-config'
} as const;

const TYPE_TO_TYPESCRIPT = {
	autoEmbedOnBody: 'types-auto',
	autoEmbedWithTarget: 'types-auto',
	autoEmbedMultiple: 'types-auto',
	embed: 'types',
	embedMultiple: 'types-multiple'
} as const;

export { TYPE_TO_ROUTE, TYPE_TO_TYPESCRIPT, TYPE_TO_STORY };
