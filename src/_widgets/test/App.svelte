<script lang="ts">
	import type { ComponentProps } from 'svelte';
    import Example from './App.svelte'

    type ExampleProps = ComponentProps<Example>

    const props: ExampleProps = {
        lang: '',
        success: '123',
        info: '123'
    }
</script>

<Example success={props.success} error="error" info={props.info}></Example>