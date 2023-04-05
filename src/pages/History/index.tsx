import { useContext } from 'react';
import * as S from './styles';
import { CyclesContext } from '../../contexts/CycleContext';

export function History() {
  const { cycles } = useContext(CyclesContext);

  return (
    <S.HistoryConatiner>
      <h1>Meu Histórico</h1>

      <S.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>{cycle.startDate.toISOString()}</td>
                <td>
                  {cycle.finishedAt && (
                    <S.Status statusColor="green">Concluído</S.Status>
                  )}

                  {cycle.interruptedAt && (
                    <S.Status statusColor="red">Interrompido</S.Status>
                  )}

                  {!cycle.finishedAt && !cycle.interruptedAt && (
                    <S.Status statusColor="yellow">Em andamento</S.Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </S.HistoryList>
    </S.HistoryConatiner>
  );
}
