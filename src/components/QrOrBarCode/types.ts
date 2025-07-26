import type { ScanResult } from '../Scanner/types.ts';

export type QrOrBarCodeProps = {
  codeInfo: ScanResult;
  size: 'small' | 'large';
};
