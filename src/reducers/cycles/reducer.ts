import { ActionsTypes } from './actions';
import { CycleState } from '../../contexts/typings';

export function CyclesReducer(state: CycleState, action: any) {
  switch (action.type) {
    case ActionsTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      };

    case ActionsTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              interruptedAt: new Date(),
            };
          } else {
            return cycle;
          }
        }),
        activeCycleId: null,
      };

    case ActionsTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              finishedAt: new Date(),
            };
          } else {
            return cycle;
          }
        }),
        activeCycleId: null,
      };

    default:
      return state;
  }
}
