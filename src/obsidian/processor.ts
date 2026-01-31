import { MarkdownPostProcessorContext, Plugin } from 'obsidian'
import parseFA from '../core/parser'
import graphToDot from '../core/dot'
import renderDotToSVG from '../render/graphviz'
import { normalizeGraph } from '../core/normalize'

export default function registerFAProcessor(plugin: Plugin) {
    plugin.registerMarkdownCodeBlockProcessor('fa', async(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
        try {
            const raw = parseFA(source)
            const graph = normalizeGraph(raw)
            const dot = graphToDot(graph)
            const svg = await renderDotToSVG(dot)

            svg.querySelectorAll('polygon, rect').forEach(el => {
                const fill = el.getAttribute('fill')
                if(fill === 'white' || fill === '#ffffff' || fill === 'none') el.remove()
            })
            el.classList.add('fa-diagram')
            svg.style.background = 'transparent'
            svg.style.display = 'block'
            el.appendChild(svg)
        } catch(err: any) {
            const errorEl = document.createElement('div')
            errorEl.style.color = 'red'
            errorEl.textContent = `Error parsing FA: ${err.message}`
            el.appendChild(errorEl)
        }
    })
}
