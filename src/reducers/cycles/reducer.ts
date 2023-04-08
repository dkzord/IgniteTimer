import { ActionsTypes } from './actions';
import { CycleState } from '../../contexts/typings';

import { produce } from 'immer';

export function CyclesReducer(state: CycleState, action: any) {
  switch (action.type) {
    case ActionsTypes.ADD_NEW_CYCLE:
      return produce(state, (draf) => {
        draf.cycles.push(action.payload.newCycle);
        draf.activeCycleId = action.payload.newCycle.id;
      });

    case ActionsTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });

      if (currentCycleIndex < 0) return state;

      return produce(state, (draf) => {
        draf.activeCycleId = null;
        draf.cycles[currentCycleIndex].interruptedAt = new Date();
      });
    }

    case ActionsTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });

      if (currentCycleIndex < 0) return state;

      return produce(state, (draf) => {
        draf.activeCycleId = null;
        draf.cycles[currentCycleIndex].finishedAt = new Date();
      });
    }

    default:
      return state;
  }
}
