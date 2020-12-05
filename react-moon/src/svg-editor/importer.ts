export enum IPhases {
    PHASE_ONE = 'PHASE_ONE',
    PHASE_TWO = 'PHASE_TWO',
    PHASE_THREE = 'PHASE_THREE',
    PHASE_FOUR = 'PHASE_FOUR'
}

export interface IUser {
    uid: string;
    set_phase: IPhases;
}

const user: IUser = {
    set_phase: IPhases['PHASE_ONE'],
    uid: 'abc'
}