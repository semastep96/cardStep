import {useEffect, useRef, useState} from 'react';
import Result from "@zxing/library/esm/core/Result";
import BarcodeScanner from "react-qr-barcode-scanner";
import type {ScannerProps} from "./types.ts";
import {getScanResultFromQrBarcode} from "./utils.ts";
import './style.css';
import beepFile from './scanner-beep-90395.mp3';

const Scanner = ({onSuccessScan}: ScannerProps) => {
  const audioRef = useRef(new Audio(beepFile));

  const [data, setData] = useState<Result | null>(null);

  useEffect(() => {
    if (data) onSuccessScan(getScanResultFromQrBarcode(data));
  }, [data]);
  return (
    <div className={'qr-video'}>
      <BarcodeScanner onUpdate={(_err, data) => {
        if (data) {
          audioRef.current.play().catch(console.error);
          setData(data);
          return;
        }
        setData(null);
      }}/>
    </div>
  );
};

export default Scanner;
