import { useEffect, useRef, useState } from 'react';
import Result from '@zxing/library/esm/core/Result';
import BarcodeScanner from 'react-qr-barcode-scanner';
import type { ScannerModes, ScannerProps } from './types.ts';
import { getScanResultFromQrBarcode } from './utils.ts';
import './style.css';

const Scanner = ({ onSuccessScan }: ScannerProps) => {
  const audioRef = useRef(new Audio('./scanner-beep.mp3'));

  const [data, setData] = useState<Result | null>(null);
  const [title, setTitle] = useState<string>('');
  const [mode, setMode] = useState<ScannerModes>('configure');
  const isScan = mode === 'scan';

  useEffect(() => {
    if (data) onSuccessScan(getScanResultFromQrBarcode(data, title));
  }, [data]);

  return (
    <>
      {!isScan && (
        <div>
          Назовите карточку
          <input
            style={{ marginLeft: 15 }}
            value={title}
            type={'text'}
            onChange={({ target: { value } }) => setTitle(value)}
          />
        </div>
      )}
      {!isScan && (
        <button disabled={!title} onClick={() => setMode('scan')}>
          Начать сканирование
        </button>
      )}
      {isScan && (
        <div className={'qr-video'}>
          <BarcodeScanner
            videoConstraints={{
              width: { ideal: 2560 },
              height: { ideal: 1440 },
              aspectRatio: { ideal: 16 / 9 },
              frameRate: { ideal: 60 },
              facingMode: { ideal: 'environment' },
            }}
            onError={(err) => console.error(err)}
            onUpdate={(_err, data) => {
              if (data) {
                audioRef.current
                  .play()
                  .catch((err) => alert(JSON.stringify(err)));
                setData(data);
                return;
              }
              setData(null);
            }}
          />
        </div>
      )}
    </>
  );
};

export default Scanner;
