import type { AutomataGraph } from './ast'

export default function parseFA(source: string): AutomataGraph {
	const graph: AutomataGraph = { accept: [], transitions: [] }
	
	const lines = source.split('\n').map(line => line.trim()).filter(line => line.length > 0)
	for(const line of lines) {
		if(line.startsWith('start ')) {
			graph.start = line.replace('start ', '').trim()
			continue
		}

		if(line.startsWith('accept ')) {
			const states = line.replace('accept ', '').trim().split(/\s+/)
			graph.accept.push(...states)
			continue
		}

		const match = line.match(/^(\w+)\s*-\s*(.+?)\s*->\s*(\w+)$/)
		if(match) {
			const [, from, label, to] = match
			graph.transitions.push({ from, to, label })
			continue
		}

		throw new Error(`Invalid syntax: "${line}"`)
	}

	return graph
}
