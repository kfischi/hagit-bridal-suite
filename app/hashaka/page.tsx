The Netlify deploy errored, with the following guidance provided:

**Diagnosis**
- The build stops during the type-checking step because TypeScript rejects the `style` prop being passed to `FadeIn` in `app/hashaka/page.tsx`. See [lines 71-78](#L71-L78). The `FadeIn` component’s prop types currently allow `children`, `className`, `delay`, etc., but do not define a `style` prop, so TypeScript considers the `style={{ ... }}` usage invalid.

**Solution**
- Update the `FadeIn` component so its prop type includes an optional `style` field (e.g., `style?: React.CSSProperties`) and forward that prop to the underlying element. For example:

```tsx
// components/FadeIn.tsx
type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function FadeIn({ children, delay = 0, className, style }: FadeInProps) {
  return (
    <div className={className} style={style}>
      {/* existing animation logic */}
      {children}
    </div>
  );
}
```

- Alternatively, remove the `style` prop from `FadeIn` usages and move the styles to a wrapping element or CSS class. Either adjustment will allow `next build` to succeed.

The relevant error logs are:

Line 59: [36m$ npm run build[39m
Line 60: > hagit-bridal-suite@1.0.0 build
Line 61: > next build
Line 62:    [1m[38;2;173;127;168m▲ Next.js 15.5.12[39m[22m
Line 63:    - Environments: .env.local
Line 64:  [37m[1m [22m[39m Creating an optimized production build ...
Line 65: Retrying 1/3...
Line 66: Retrying 1/3...
Line 67:  [32m[1m✓[22m[39m Compiled successfully in 8.1s
Line 68:  [37m[1m [22m[39m Linting and checking validity of types ...
Line 69: [31mFailed to compile.
Line 70: [39m
Line 71: [36m./app/hashaka/page.tsx[39m:[33m307[39m:[33m45[39m
Line 72: [31m[1mType error[22m[39m: Type '{ children: Element[]; className: string; style: { marginBottom: string; }; }' is not assig
Line 73:   Property 'style' does not exist on type 'IntrinsicAttributes & { children: ReactNode; delay?: number | undefined; className?: 
Line 74: [0m [90m 305 |[39m         [33m<[39m[33msection[39m style[33m=[39m{{ padding[33m:[39m [32m'100px 24px'[39m[33m,[3
Line 75:  [90m 306 |[39m           [33m<[39m[33mdiv[39m style[33m=[39m{{ maxWidth[33m:[39m [32m'560px'[39m[33m,[39m margin
Line 76: [31m[1m>[22m[39m[90m 307 |[39m             [33m<[39m[33mFadeIn[39m className[33m=[39m[32m"text-center"[39m style[
Line 77:  [90m     |[39m                                             [31m[1m^[22m[39m
Line 78:  [90m 308 |[39m               [33m<[39m[33mp[39m style[33m=[39m{{ color[33m:[39m [32m'#A07840'[39m[33m,[39m fontSi
Line 79:  [90m 309 |[39m                 מה כלול
Line 80:  [90m 310 |[39m               [33m<[39m[33m/[39m[33mp[39m[33m>[39m[0m
Line 81: Next.js build worker exited with code: 1 and signal: null
Line 82: [91m[1m​[22m[39m
Line 83: [91m[1m"build.command" failed                                        [22m[39m
Line 84: [91m[1m────────────────────────────────────────────────────────────────[22m[39m
Line 85: ​
Line 86:   [31m[1mError message[22m[39m
Line 87:   Command failed with exit code 1: npm run build
Line 88: ​
Line 89:   [31m[1mError location[22m[39m
Line 90:   In Build command from Netlify app:
Line 91:   npm run build
Line 92: ​
Line 93:   [31m[1mResolved config[22m[39m
Line 94:   build:
Line 95:     command: npm run build
Line 96:     commandOrigin: ui
Line 97:     environment:
Line 98:       - ANTHROPIC_API_KEY
Line 99:     publish: /opt/build/repo/.next
Line 100:     publishOrigin: ui
Line 101:   plugins:
Line 102:     - inputs: {}
Line 103:       origin: ui
Line 104:       package: "@netlify/plugin-nextjs"
Line 105: Build failed due to a user error: Build script returned non-zero exit code: 2
Line 106: Failed during stage 'building site': Build script returned non-zero exit code: 2
Line 107: Failing build: Failed to build site
Line 108: Finished processing build request in 28.06s
