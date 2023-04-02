import { createContext, useContext, useState } from 'react';

const CycleContext = createContext({} as any);

function NewCycleForm() {
  const { activeCycle, setActiveCycle } = useContext(CycleContext);

  return (
    <h1>
      New Cycle Form: {activeCycle}
      <button onClick={() => setActiveCycle(activeCycle + 1)}>
        mudar para 2
      </button>
    </h1>
  );
}

function Countdown() {
  const { activeCycle } = useContext(CycleContext);

  return <h1>Countdown: {activeCycle}</h1>;
}

export const Home = () => {
  const [activeCycle, setActiveCycle] = useState(0);

  return (
    <CycleContext.Provider value={{ activeCycle, setActiveCycle }}>
      <div>
        <NewCycleForm />
        <Countdown />
      </div>
    </CycleContext.Provider>
  );
};
