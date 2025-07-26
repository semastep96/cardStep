import type Result from "@zxing/library/esm/core/Result";
import {BarcodeFormat} from "react-qr-barcode-scanner";
import type {ScanResult} from "./types.ts";

export const getScanResultFromQrBarcode = (qrBarResult: Result, title: string): ScanResult => {
  const text = qrBarResult.getText();
  const format = qrBarResult.getBarcodeFormat();

  if (text && format) return ({
    text,
    title,
    format: BarcodeFormat[format] as ScanResult["format"]
  });

  throw new Error('Ошибка чтения qr/bar кода');
};
