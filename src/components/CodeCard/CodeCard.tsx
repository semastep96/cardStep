import type { CodeCardProps } from './types.ts';
import Barcode from 'react-barcode';
import { scanFormtToBarcodeFormat } from './utils.ts';
import QRCode from 'react-qr-code';
import { deleteScan } from '../../database/db.ts';

const CodeCard = ({ codeInfo, onDelete, onClose }: CodeCardProps) => {
  const format = scanFormtToBarcodeFormat(codeInfo.format);
  const text = codeInfo.text;
  return (
    <div className={'code-card'}>
      <div>{codeInfo.title}</div>
      {format !== 'QR' && <Barcode value={text} format={format} />}
      {format == 'QR' && <QRCode value={text} />}
      <div>#{text}</div>
      <div>#{format}</div>
      <button
        onClick={() =>
          deleteScan(codeInfo.id)
            .then(() => onDelete())
            .catch(console.error)
        }
      >
        удалить
      </button>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default CodeCard;
