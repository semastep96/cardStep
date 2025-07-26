import type { MinCodeCardProps } from './types.ts';
import { deleteScan } from '../../database/db.ts';
import './styles.css';
import { Card, Tooltip } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { QrOrBarCode } from '../QrOrBarCode/QrOrBarCode.tsx';

export const MinCodeCard = ({
  cardInfo,
  onSelectCard,
  onDeleteCard,
}: MinCodeCardProps) => {
  return (
    <Card
      onClick={() => {
        onSelectCard(cardInfo.id);
      }}
      style={{
        width: '100%',
        height: 'max-content',
      }}
      title={cardInfo.title}
      actions={[
        <Tooltip key={'delete-card'} title="Удалить">
          <DeleteFilled
            onClick={(e) => {
              e.stopPropagation();
              deleteScan(cardInfo.id)
                .then(() => onDeleteCard())
                .catch(console.error);
            }}
          />
        </Tooltip>,
      ]}
    >
      <div className={'mini-card-content'}>
        <QrOrBarCode size={'small'} codeInfo={cardInfo} />
      </div>
    </Card>
  );
};
