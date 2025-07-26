import type { QrOrBarCodeProps } from './types.ts';
import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';
import { scanFormToBarcodeFormat } from '../CodeCard/utils.ts';
import './style.css';

export const QrOrBarCode = ({
  codeInfo: { format, text },
  size,
}: QrOrBarCodeProps) => {
  const codeFormat = scanFormToBarcodeFormat(format);
  return (
    <div className={'bar-or-qr-code'}>
      {codeFormat !== 'QR' && (
        <Barcode
          height={size === 'small' ? 150 : undefined}
          value={text}
          format={codeFormat}
        />
      )}
      {codeFormat == 'QR' && (
        <QRCode size={size === 'small' ? 150 : undefined} value={text} />
      )}
    </div>
  );
};
