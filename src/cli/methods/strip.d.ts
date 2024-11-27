declare module 'rollup-plugin-strip' {
    import { Plugin } from 'rollup';
  
    interface StripOptions {
      include?: string | string[];
      exclude?: string | string[];
      debugger?: boolean;
      sourceMap?: boolean;
      functions?: string[];
    }
  
    function strip(options?: StripOptions): Plugin;
  
    export = strip;
  }
  