import { AutomataGraph } from './ast'
import { computeLevels, detectDeadStates } from './normalize'

export default function graphToDot(graph: AutomataGraph): string {
    const lines: string[] = []
    const deadStates = detectDeadStates(graph)
    const levels = computeLevels(graph)

    lines.push('digraph FA {')
    lines.push('    rankdir=LR;')
    lines.push('    ranksep=0.4;')
    lines.push('    nodesep=0.3;')
    lines.push('    splines=true;')
    lines.push('    overlap=false;')
    lines.push('    concentrate=true;')
    lines.push('    node [shape=circle, fontname="Inter"];')
    lines.push('    edge [fontname="Inter"];')

    if(graph.start) {
        lines.push('    __start__ [shape=point];')
        lines.push(`    __start__ -> ${graph.start};`)
    }

    for(const s of graph.accept) lines.push(`    ${s} [shape=doublecircle];`)

    if(deadStates.size > 0) {
        lines.push('    subgraph cluster_dead {')
        lines.push('    label="";')
        lines.push('    style=dashed;')
        lines.push('    color=gray;')
        lines.push('    ' + [...deadStates].join(' '))
        lines.push('    }')
    }
    const groups: Record<number, string[]> = { }
    for(const [state, level] of levels.entries()) {
        if(!groups[level]) groups[level] = []
        groups[level].push(state)
    }
    for(const lvl in groups) lines.push(`    { rank=same; ${groups[lvl].join(' ')} }`)

    const orderedLevels = Object.keys(groups).map(Number).sort((a, b) => a - b)
    for(let i = 0; i < orderedLevels.length - 1; i++) {
        const fromState = groups[orderedLevels[i]][0]
        const toState = groups[orderedLevels[i + 1]][0]
        lines.push(`    ${fromState} -> ${toState} [style=invis, weight=10];`)
    }

    for(const t of graph.transitions) {
        if(t.from === t.to) {
            if(deadStates.has(t.from)) lines.push(`    ${t.from} -> ${t.to} [label="${t.label}", dir=both, labeldistance=1.6, labelangle=-90];`)
            else lines.push(`    ${t.from} -> ${t.to} [label="${t.label}"];`)
        } else lines.push(`    ${t.from} -> ${t.to} [label="${t.label}"];`)
    }

    lines.push('}')
    return lines.join('\n')
}
