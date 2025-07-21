import {useEffect, useState} from 'react';
import Result from "@zxing/library/esm/core/Result";
import BarcodeScanner from "react-qr-barcode-scanner";
import type {ScannerProps} from "./types.ts";
import {getScanResultFromQrBarcode} from "./utils.ts";
import './style.css';

const Scanner = ({onSuccessScan}: ScannerProps) => {
  const [data, setData] = useState<Result | null>(null);

  useEffect(() => {
    if (data) onSuccessScan(getScanResultFromQrBarcode(data));
  }, [data]);
  return (
    <div className={'qr-video'}>
      <BarcodeScanner onUpdate={(_err, data) => {
        if (data) {
          setData(data);
          return;
        }
        setData(null);
      }}/>
    </div>
  );
};

export default Scanner;
