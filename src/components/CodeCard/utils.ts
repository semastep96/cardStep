import type { ScanResult } from '../Scanner/types.ts';
import type { CodeCardFormat } from './types.ts';

export const scanFormtToBarcodeFormat = (
  scanFormat: ScanResult['format'],
): CodeCardFormat => {
  switch (scanFormat) {
    case 'QR_CODE':
      return 'QR';
    case 'CODE_39':
      return 'CODE39';
    case 'CODABAR':
      return 'codabar';
    case 'CODE_128':
      return 'CODE128';
    case 'EAN_8':
      return 'EAN8';
    case 'EAN_13':
      return 'EAN13';
    default:
      throw new Error('Неизвестный код');
  }
};
