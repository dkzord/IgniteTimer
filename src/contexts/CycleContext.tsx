import { createContext, useReducer, useState } from 'react';
import {
  CreateCycleData,
  Cycle,
  CycleContentProviderProps,
  CycleContextType,
  CycleState,
} from './typings';

export const CyclesContext = createContext({} as CycleContextType);

export function CyclesContextProvider({ children }: CycleContentProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CycleState, action: any) => {
      if (action.type === 'ADD_NEW_CYCLE') {
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        };
      }

      if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
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
      }

      if (action.type === 'MARK_CURRENT_CYCLE_AS_FINISHED') {
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
      }

      return state;
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  );
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinshed() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      },
    });
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    });

    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    });
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinshed,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
