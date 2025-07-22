import type {CodeCardProps} from "./types.ts";
import Barcode from "react-barcode";
import {scanFormtToBarcodeFormat} from "./utils.ts";
import QRCode from "react-qr-code";

const CodeCard = ({codeInfo}: CodeCardProps) => {
  const format = scanFormtToBarcodeFormat(codeInfo.format);
  const text = codeInfo.text;
  return (<div className={'code-card'}>
    {format !== 'QR' && <Barcode value={text} format={format}/>}
    {format == 'QR' && <QRCode value={text}/>}
    <div>#{text}</div>
    <div>#{format}</div>
  </div>
  );
};

export default CodeCard;
