# What's this?

- This is the https://github.com/beyonk-group/svelte-notifications repository - which includes an "lib" structure and javascript - being bundled in with `svelte-standalone`. 

I did a quick video doing it, see it below: (It also has detailed steps below)

https://github.com/user-attachments/assets/22fbd243-2b94-4a10-a905-b4910dcb95d3

As you can see. Even though `svelte-notifications` uses "svelte": "^3.47.0", it just work.

# How this work?

1. I downloaded `svelte-notifications` code.
2. I created a standalone component with `standalone create`.
3. I pasted the code of `svelte-notifications` on my `beyonk` component that I just created.
4. I swaped `$lib` to `lib` since it was the new folder.
5. I just builded with it `standalone build`. 
