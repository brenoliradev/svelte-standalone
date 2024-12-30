<script>
    import { Tipex } from "@friendofsvelte/tipex";

    import "@friendofsvelte/tipex/styles/Tipex.css";
    import "@friendofsvelte/tipex/styles/ProseMirror.css";
    import "@friendofsvelte/tipex/styles/Controls.css";
    import "@friendofsvelte/tipex/styles/EditLink.css";
    import "@friendofsvelte/tipex/styles/CodeBlock.css";
    
    let body = `<p>This <a target="_blank" rel="noopener noreferrer" href="">content</a> is written by <a target="_blank" rel="noopener noreferrer" href="http://brenoliradev.com/">brenoliradev</a> in 2024.</p>`;
</script>

<Tipex 
    {body} 
    controls 
    floating
    style="margin-top: 1rem; margin-bottom: 0;"
    class="h-[70vh] border border-neutral-200"
/>