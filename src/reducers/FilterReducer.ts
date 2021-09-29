import {FilterValuesType} from "../App";

export const FilterReducer = (state: FilterValuesType, action: SetFilterACType) => {
    switch (action.type){
        case 'SET-FILTER':{
            return action.value
        }
        default: return state
    }
}

export type  SetFilterACType = ReturnType<typeof SetFilterAC>
export const SetFilterAC = (value: FilterValuesType) => {
    return{
        type: 'SET-FILTER',
        value
    } as const
}