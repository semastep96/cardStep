import {useCallback, useState} from 'react';
import './App.css';
import CodeCard from "./components/CodeCard/CodeCard.tsx";
import Scanner from "./components/Scanner/Scanner.tsx";
import type {ScanResult} from "./components/Scanner/types.ts";

function App() {
  const [isScan, setIsScan] = useState(false);
  const [data, setData] = useState<ScanResult[]>([]);
  const onScan = useCallback((result: ScanResult) => {
    setData([...data, result]);
    setIsScan(false);
  }, [data]);
  const startScan = useCallback(() => setIsScan(true), []);

  const cards = !isScan && data.map((card, index) => <CodeCard key={card.title + index} codeInfo={card}/>);

  return (
    <>
      {!isScan && <button onClick={startScan}>Добавить карточку</button>}
      {isScan && <Scanner onSuccessScan={onScan}/>}
      {cards}
    </>
  );
}

export default App;
