import { useCallback, useEffect, useState } from 'react';
import './App.css';
import CodeCard from './components/CodeCard/CodeCard.tsx';
import Scanner from './components/Scanner/Scanner.tsx';
import type { ScanResult } from './components/Scanner/types.ts';
import { getAllScans, saveScan } from './database/db.ts';

function App() {
  const [isScan, setIsScan] = useState(false);
  const [data, setData] = useState<ScanResult[]>([]);

  const onScan = useCallback(
    (result: ScanResult) => {
      saveScan(result)
        .then(() => setData([...data, result]))
        .catch(console.error);
      setIsScan(false);
    },
    [data],
  );

  const onDelete = useCallback(() => {
    getAllScans()
      .then((result) => setData(result))
      .catch(console.error);
  }, []);
  const startScan = useCallback(() => setIsScan(true), []);

  const cards = !isScan && (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
      }}
    >
      {data.map((card, index) => (
        <CodeCard
          key={card.title + index}
          codeInfo={card}
          onDelete={onDelete}
        />
      ))}
    </div>
  );

  useEffect(() => {
    getAllScans()
      .then((result) => setData(result))
      .catch(console.error);
  }, []);

  return (
    <>
      {!isScan && <button onClick={startScan}>Добавить карточку</button>}
      {isScan && <Scanner onSuccessScan={onScan} />}
      {cards}
    </>
  );
}

export default App;
