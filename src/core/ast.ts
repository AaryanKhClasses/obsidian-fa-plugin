export type StateId = string

export interface Transition {
    from: StateId,
    to: StateId,
    label: string
}

export interface AutomataGraph {
    start?: StateId,
    accept: StateId[],
    transitions: Transition[]
}
