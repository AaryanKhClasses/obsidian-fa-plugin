import { AutomataGraph, Transition } from './ast'

export function normalizeGraph(graph: AutomataGraph): AutomataGraph {
    const merged: Record<string, Transition> = { }

    for(const t of graph.transitions) {
        const key = `${t.from}->${t.to}`
        if(!merged[key]) merged[key] = { ...t }
        else merged[key].label += `,${t.label}`
    }

    return { ...graph, transitions: Object.values(merged) }
}

export function detectDeadStates(graph: AutomataGraph): Set<string> {
    const dead = new Set<string>()

    const outgoing = new Map<string, string[]>()
    for(const t of graph.transitions) {
        if(!outgoing.has(t.from)) outgoing.set(t.from, [])
        outgoing.get(t.from)!.push(t.to)
    }

    for(const [state, targets] of outgoing.entries()) {
        if(targets.every(t => t === state)) dead.add(state)
    }

    return dead
}

export function computeLevels(graph: AutomataGraph): Map<string, number> {
    const levels = new Map<string, number>()
    if(!graph.start) return levels

    const queue: string[] = [graph.start]
    levels.set(graph.start, 0)

    while(queue.length > 0) {
        const s = queue.shift()!
        const lvl = levels.get(s)!

        for(const t of graph.transitions) {
            if(t.from === s && !levels.has(t.to)) {
                levels.set(t.to, lvl + 1)
                queue.push(t.to)
            }
        }
    }

    return levels
}
