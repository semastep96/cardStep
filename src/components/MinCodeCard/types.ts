import type { ScanResult } from '../Scanner/types.ts';

export type MinCodeCardProps = {
  cardInfo: ScanResult;
  onSelectCard: (id: string) => void;
  onDeleteCard: VoidFunction;
};
