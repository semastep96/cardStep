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
  const [settings, setSettings] = useState<MediaTrackSettings>();

  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: { ideal: 'environment' },
      },
    })
    .then((stream) => {
      const settings = stream.getVideoTracks()[0].getSettings();
      setSettings(settings);
    });

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
      {settings && (
        <div>
          {JSON.stringify({
            width: settings.width,
            height: settings.height,
          })}
        </div>
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
                ideal: 1920,
              },
              height: {
                ideal: 1080,
              },
              frameRate: {
                ideal: 60,
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
