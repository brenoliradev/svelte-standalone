<script lang="ts">
    const greeting = () => {
        alert('thank you for using svelte-standalone!')
    }
</script>

<button 
    on:click|preventDefault={greeting} 
    class="btn"
>
    Hello world
</button>

<style>
    .btn {
        padding-top: 0.625rem;
        padding-bottom: 0.625rem; 
        padding-left: 1.25rem;
        padding-right: 1.25rem; 
        border-radius: 0.5rem; 
        font-size: 0.875rem;
        line-height: 1.25rem; 
        font-weight: 500; 
        color: #ffffff; 
        background-color: #1D4ED8; 
    }

    .btn:hover {
        background-color: #1E40AF; 
     }
</style>
