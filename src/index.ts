import { Plugin } from 'obsidian'
import registerFAProcessor from './obsidian/processor'

export default class FADiagramPlugin extends Plugin {
    async onload(): Promise<void> {
        console.log('Finite Automata Diagram Plugin loaded')
        registerFAProcessor(this)
        this.registerStyleSheet()
    }

    onunload(): void {
        console.log('Finite Automata Diagram Plugin unloaded')
    }

    registerStyleSheet(): void {
        const style = document.createElement('style')
        style.id = 'fa-diagram-styles'
        style.textContent = `
            .fa-diagram {
                color: var(--text-normal);
            }

            .callout .fa-diagram {
                color: var(--callout-color);
            }

            .fa-diagram svg {
                background: transparent !important;
            }

            .fa-diagram ellipse {
                fill: color-mix(in srgb, currentColor 8%, transparent);
                stroke: currentColor;
                stroke-width: 1.5px;
                filter: drop-shadow(0 0 2px rgba(0,0,0,0.15));
            }

            .fa-diagram ellipse + ellipse {
                stroke-width: 2px;
                stroke: var(--interactive-accent);
            }

            .fa-diagram path {
                stroke: currentColor;
                stroke-width: 1.2px;
                stroke-linecap: round;
                stroke-linejoin: round;
            }

            .fa-diagram polygon {
                fill: currentColor;
            }

            .fa-diagram text {
                fill: currentColor;
                font-family: var(--font-interface);
            }
        `
        document.head.appendChild(style)
    }
}
