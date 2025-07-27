import { useRef, useState } from 'react';
import Result from '@zxing/library/esm/core/Result';
import BarcodeScanner from 'react-qr-barcode-scanner';
import type { ScannerModes, ScannerProps } from './types.ts';
import { getScanResultFromQrBarcode } from './utils.ts';
import './style.css';
import { Button, Input } from 'antd';
import { SunFilled, SunOutlined } from '@ant-design/icons';

const Scanner = ({ onSuccessScan }: ScannerProps) => {
  const audioRef = useRef(new Audio('./scanner-beep.mp3'));

  const [data, setData] = useState<Result | null>(null);
  const [title, setTitle] = useState<string>('');
  const [mode, setMode] = useState<ScannerModes>('scan');
  const [torch, setTorch] = useState<boolean>(false);
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
          <Button
            className={'qr-video-button'}
            onClick={() => setTorch(!torch)}
          >
            {torch ? <SunOutlined /> : <SunFilled />}
          </Button>
          <BarcodeScanner
            videoConstraints={{
              width: {
                min: 720,
                ideal: 1280,
                max: 1920,
              },
              height: {
                min: 720,
                ideal: 1080,
                max: 1080,
              },
              frameRate: {
                min: 30,
                ideal: 60,
                max: 60,
              },
              facingMode: { ideal: 'environment' },
            }}
            torch={torch}
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
