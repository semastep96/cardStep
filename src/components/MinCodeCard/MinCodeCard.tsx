import type { MinCodeCardProps } from './types.ts';
import { deleteScan } from '../../database/db.ts';
import './styles.css';

export const MinCodeCard = ({
  cardInfo,
  onSelectCard,
  onDeleteCard,
}: MinCodeCardProps) => {
  return (
    <div className={'min-code-card'} onClick={() => onSelectCard(cardInfo.id)}>
      {cardInfo.title}
      <button
        className={'min-code-card__btn'}
        onClick={(e) => {
          e.stopPropagation();
          deleteScan(cardInfo.id)
            .then(() => onDeleteCard())
            .catch(console.error);
        }}
      >
        Удалить
      </button>
    </div>
  );
};
