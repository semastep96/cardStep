import { useCallback, useState } from 'react';
import './App.css';
import CodeCard from "./components/CodeCard/CodeCard.tsx";
import Scanner from "./components/Scanner/Scanner.tsx";
import type { ScanResult } from "./components/Scanner/types.ts";

function App() {
  const [isScan, setIsScan] = useState(false);
  const [data, setData] = useState<ScanResult | null>(null);
  const onScan = useCallback((result: ScanResult) => {
    setData(result);
    setIsScan(false);
  }, []);
  const startScan = useCallback(() => setIsScan(true), []);

  return (
    <>
      {!isScan && !data && <button onClick={startScan}>Отсканировать</button>}
      {isScan && <Scanner onSuccessScan={onScan}/>}
      {data && !isScan && <CodeCard codeInfo={data}/>}
    </>
  );
}

export default App;
