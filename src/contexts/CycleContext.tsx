import { createContext, useReducer, useState } from 'react';
import {
  CreateCycleData,
  Cycle,
  CycleContentProviderProps,
  CycleContextType,
} from './typings';
import { CyclesReducer } from '../reducers/cycles';
import { ActionsTypes } from './typignsEnum';

export const CyclesContext = createContext({} as CycleContextType);

export function CyclesContextProvider({ children }: CycleContentProviderProps) {
  const [cyclesState, dispatch] = useReducer(CyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinshed() {
    dispatch({
      type: ActionsTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
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
      type: ActionsTypes.ADD_NEW_CYCLE,
      payload: {
        newCycle,
      },
    });

    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    dispatch({
      type: ActionsTypes.INTERRUPT_CURRENT_CYCLE,
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
