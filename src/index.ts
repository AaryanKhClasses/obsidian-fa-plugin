import { Plugin } from 'obsidian'
import registerFAProcessor from './obsidian/processor'

export default class FADiagramPlugin extends Plugin {
    async onload(): Promise<void> {
        console.log('Finite Automata Diagram Plugin loaded')
        registerFAProcessor(this)
    }

    onunload(): void {
        console.log('Finite Automata Diagram Plugin unloaded')
    }
}
