# What's this?

This is the [svelte-notifications](https://github.com/beyonk-group/svelte-notifications) repository, which includes a "lib" structure and JavaScript, bundled with `svelte-standalone`.

You can also check how the component works: https://svelte-standalone-beyonk.vercel.app/beyonk

I made a quick video demonstrating how to do it. You can see it below, along with detailed steps:

[Watch the video](https://github.com/user-attachments/assets/22fbd243-2b94-4a10-a905-b4910dcb95d3)

As you can see, even though `svelte-notifications` uses `"svelte": "^3.47.0"`, it just works.

# How does this work?

1. I downloaded the `svelte-notifications` code.
2. I created a standalone component with `npx standalone create`.
3. I pasted the code from `svelte-notifications` into the `beyonk` component I just created.
4. I swapped `$lib` to `lib` since it was the new folder structure.
5. I built it with `npx standalone build`.
