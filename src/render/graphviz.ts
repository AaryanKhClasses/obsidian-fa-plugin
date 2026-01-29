import { instance } from '@viz-js/viz'

let vizPromise: ReturnType<typeof instance> | null = null

async function getViz() {
    if(!vizPromise) vizPromise = instance()
    return vizPromise
}

export default async function renderDotToSVG(dot: string): Promise<SVGElement> {
    const viz = await getViz()
    return viz.renderSVGElement(dot, { engine: 'dot' })
}
