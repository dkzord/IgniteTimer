export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedAt?: Date;
  finishedAt?: Date;
}

export interface CycleContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinshed: () => void;
  setSecondsPassed: (seconds: number) => void;
}
