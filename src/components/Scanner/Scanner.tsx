import {useEffect, useRef, useState} from 'react';
import Result from "@zxing/library/esm/core/Result";
import BarcodeScanner from "react-qr-barcode-scanner";
import type {ScannerModes, ScannerProps} from "./types.ts";
import {getScanResultFromQrBarcode} from "./utils.ts";
import './style.css';

const Scanner = ({onSuccessScan}: ScannerProps) => {
  const audioRef = useRef(new Audio('./scanner-beep.mp3'));

  const [data, setData] = useState<Result | null>(null);
  const [title, setTitle] = useState<string>('');
  const [mode, setMode] = useState<ScannerModes>('configure');
  const isScan = mode === 'scan';

  useEffect(() => {
    if (data) onSuccessScan(getScanResultFromQrBarcode(data, title));
  }, [data]);
  return (<>
    {!isScan && <input value={title} type={'text'} onChange={({target: {value}}) => setTitle(value)}/>}
    {title && !isScan && <button onClick={() => setMode('scan')}>Начать сканирование</button>}
    {isScan && <div className={'qr-video'}>
      <BarcodeScanner onUpdate={(_err, data) => {
        if (data) {
          audioRef.current.play().catch(console.error);
          setData(data);
          return;
        }
        setData(null);
      }}/>
    </div>}
  </>
  );
};

export default Scanner;
