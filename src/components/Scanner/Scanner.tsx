import { useRef, useState } from 'react';
import Result from '@zxing/library/esm/core/Result';
import BarcodeScanner from 'react-qr-barcode-scanner';
import type { ScannerModes, ScannerProps } from './types.ts';
import { getScanResultFromQrBarcode } from './utils.ts';
import './style.css';
import { Button, Input } from 'antd';

const Scanner = ({ onSuccessScan }: ScannerProps) => {
  const audioRef = useRef(new Audio('./scanner-beep.mp3'));

  const [data, setData] = useState<Result | null>(null);
  const [title, setTitle] = useState<string>('');
  const [mode, setMode] = useState<ScannerModes>('scan');
  const isScan = mode === 'scan';

  return (
    <>
      {!isScan && (
        <Input
          placeholder="Ввелите название"
          value={title}
          type={'text'}
          onChange={({ target: { value } }) => setTitle(value)}
        />
      )}
      {!isScan && (
        <Button
          disabled={!title || !data}
          onClick={() =>
            data &&
            title &&
            onSuccessScan(getScanResultFromQrBarcode(data, title))
          }
        >
          Создать
        </Button>
      )}
      {isScan && (
        <div className={'qr-video'}>
          <BarcodeScanner
            videoConstraints={{
              width: { ideal: 414 },
              height: { ideal: 896 },
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
                setMode('configure');
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
