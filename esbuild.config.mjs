import esbuild from 'esbuild'

esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/main.js',
    platform: 'browser',
    format: 'cjs',
    sourcemap: true,
    external: ['obsidian']
})
