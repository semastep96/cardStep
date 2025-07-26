import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import Scanner from './components/Scanner/Scanner.tsx';
import type { ScanResult } from './components/Scanner/types.ts';
import { getAllScans, saveScan } from './database/db.ts';
import { MinCodeCard } from './components/MinCodeCard/MinCodeCard.tsx';
import CodeCard from './components/CodeCard/CodeCard.tsx';

function App() {
  const [isScan, setIsScan] = useState(false);
  const [cards, setCards] = useState<ScanResult[]>([]);
  const [card, setCard] = useState<ScanResult | null>(null);

  const onScan = useCallback(
    (result: ScanResult) => {
      saveScan(result)
        .then(() => setCards([...cards, result]))
        .catch(console.error);
      setIsScan(false);
    },
    [cards],
  );

  const onDelete = useCallback(() => {
    getAllScans()
      .then((result) => setCards(result))
      .catch(console.error);
  }, []);
  const startScan = useCallback(() => setIsScan(true), []);
  const onCloseCard = () => setCard(null);

  const minCards = useMemo(
    () =>
      !isScan && (
        <div
          style={{
            width: '100%',
            height: '100%',
            overflow: 'auto',
          }}
        >
          {cards.map((card, index) => (
            <MinCodeCard
              key={card.title + index}
              cardInfo={card}
              onDeleteCard={onDelete}
              onSelectCard={() => setCard(card)}
            />
          ))}
        </div>
      ),
    [cards, isScan],
  );

  useEffect(() => {
    getAllScans()
      .then((result) => setCards(result))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!card) return;
    const dontHaveCard = !cards.find(({ id }) => id === card?.id);
    if (dontHaveCard) setCard(null);
  }, [cards, card]);

  return (
    <div className="card-step">
      {!isScan && <button onClick={startScan}>Добавить карточку</button>}
      {isScan && <Scanner onSuccessScan={onScan} />}
      {card && !isScan && (
        <CodeCard codeInfo={card} onDelete={onDelete} onClose={onCloseCard} />
      )}
      {minCards}
    </div>
  );
}

export default App;
