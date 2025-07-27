import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import Result from '@zxing/library/esm/core/Result';
import BarcodeScanner from 'react-qr-barcode-scanner';
import type { ScannerModes, ScannerProps } from './types';
import { getScanResultFromQrBarcode } from './utils';
import './style.css';
import { Button, Input } from 'antd';
import { SunFilled, SunOutlined } from '@ant-design/icons';

const Scanner = ({ onSuccessScan }: ScannerProps) => {
  const audioRef = useRef(new Audio('./scanner-beep.mp3'));
  const [data, setData] = useState<Result | null>(null);
  const [title, setTitle] = useState('');
  const [mode, setMode] = useState<ScannerModes>('scan');
  const [torch, setTorch] = useState(false);
  const [caps, setCaps] = useState<MediaTrackCapabilities>();
  const [zoomFactor, setZoomFactor] = useState<number>(1);
  const isScan = mode === 'scan';

  useEffect(() => {
    async function getCaps() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();
        console.log('Capabilities:', capabilities);
        setCaps(capabilities);
        track.stop();
      } catch (e) {
        console.error('Failed to get capabilities', e);
      }
    }

    getCaps().catch(console.error);
  }, []);

  let videoConstraints:
    | {
        width: { ideal: number } | undefined;
        height: { ideal: number } | undefined;
        facingMode: { ideal: string };
        resizeMode: { ideal: string };
      }
    | { facingMode: { ideal: string } };
  if (caps) {
    videoConstraints = {
      width: caps.width?.max ? { ideal: caps.width.max } : undefined,
      height: caps.height?.max ? { ideal: caps.height.max } : undefined,
      facingMode: { ideal: 'environment' },
      resizeMode: { ideal: 'crop-and-scale' },
    };
  } else {
    videoConstraints = { facingMode: { ideal: 'environment' } };
  }

  return (
    <>
      {!isScan && (
        <Input
          placeholder="Введите название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
        <div className="qr-video">
          {caps && (
            <div className="qr-zoom-controls">
              <Button
                onClick={() => setZoomFactor((z) => Math.min(3, z + 0.25))}
              >
                +
              </Button>
              <span>{zoomFactor.toFixed(2)}×</span>
              <Button
                onClick={() => setZoomFactor((z) => Math.max(1, z - 0.25))}
              >
                –
              </Button>
            </div>
          )}
          <Button
            className="qr-video-button"
            onClick={() => setTorch((v) => !v)}
          >
            {torch ? <SunFilled /> : <SunOutlined />}
          </Button>
          <div
            className="zoom-container"
            style={{ '--zoom': zoomFactor } as React.CSSProperties}
          >
            <BarcodeScanner
              videoConstraints={videoConstraints}
              torch={torch}
              onError={(err) => console.error(err)}
              onUpdate={(_err, d) => {
                if (d) {
                  audioRef.current.play().catch(console.error);
                  setData(d);
                  setMode('configure');
                  return;
                }
                setData(null);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Scanner;
