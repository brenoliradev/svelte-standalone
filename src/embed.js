// default with import/export
export function embed(m, n) {
    var c;
    window[n] = {
        start: (props) => {
            if (!c) {
                // @ts-expect-error
                c = new m({
                    target: document.body,
                    props: {
                        ...props,
                        id: n
                    }
                });
            }
        },
        stop: () => (c.$destroy(), (c = false))
    };
}
export function embedMultiple(m, n) {
    window[n] = {
        start: (props, target) => {
            const c = new m({
                target: !target ? document.body : document.getElementById(target),
                props: props
            });
            return {
                stop: () => c.$destroy()
            };
        }
    };
}
export const autoEmbedWithTarget = (mount) => {
    const t = new URL(document.currentScript.src).searchParams.get('target');
    const c = new mount({
        target: document.getElementById(t)
    });
    window[t] = {
        stop: () => c.$destroy()
    };
};
export const autoEmbedOnBody = (m, n) => {
    const c = new m({
        target: document.body
    });
    window[n] = {
        stop: () => c.$destroy()
    };
};
