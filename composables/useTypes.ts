export interface ISelectOption {
    label: string
    value: string
}

export interface CSLink {
    label: string
    to: string
    icon: string
    iconColor: string
}

export interface Block {
    id: number
    d1: string
    d2: string
    n1: string
    n2: string
    r: number
    isPrime: boolean
    q: number
    block_id: number
}

export interface IBlock {
    block_id: number
    d1: string
    d2: string
    n1: string
    n2: string
    r: number
    isPrime: boolean
    q: number
    year: string
    platoon: string
    cards: number
}

export interface IUserSelection {
    selection_id: number
    picks: IPick[]
    bonus_3_day_block?: boolean
    bonus_4_day_block?: boolean
    user_added?: boolean
}

export interface IPick {
    id: number
    block_id: number | null
    is_r_block: boolean
    start_date?: string
    end_date?: string
    is_prime?: boolean
}

export interface ISelectionData {
    r_days_selected: number
    selections: IUserSelection[]
}

export interface ISingleUsersSelectionData {
    user_id: string
    rotation: number
    entitlement: number
    blocks: IUserSelection[]
    employee_number: number
}
export interface IDataForDatabase {
    employee_number: string
    year: number
    selections: IUserSelection[]
}
export interface IPickForDatabase {
    id: number
    block_id: number
    is_r_block: boolean
}

export enum Status {
    PENDING = 'Pending',
    PROCESSING = 'Processing',
    COMPLETE = 'Complete',
}

export interface IGroup {
    group_name: string
    cutoff_date: Date | null
    stations: string[]
}

export interface IUser {
    id: number
    employee_number: string
    email: string
    first_name: string
    last_name: string
    pattern: string
    platoon: string
    rotation: string
    selections: ISelections[]
    seniority_date: string
    stations: string
    entitlement: number
}

export interface IUserExtended extends IUser {
    calculatedEntitlement: number
    carryOver: number
    bonus: number
    round1PrimeCount: number
    holidays: [[], [], []]
}

export interface ISelections {
    selection_id: number
    picks: IPick[]
}
