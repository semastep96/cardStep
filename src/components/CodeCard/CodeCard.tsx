import type { CodeCardProps } from './types.ts';
import { QrOrBarCode } from '../QrOrBarCode/QrOrBarCode.tsx';
import { Modal } from 'antd';

const CodeCard = ({ codeInfo, onClose }: CodeCardProps) => {
  // const format = scanFormToBarcodeFormat(codeInfo.format);
  return (
    <Modal
      open
      title={codeInfo.title}
      onCancel={onClose}
      footer={[]}
      style={{ top: '5vh' }}
      styles={{
        body: {
          height: '80vh',
          width: '100%',
        },
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          height: '100%',
          padding: 10,
        }}
      >
        <QrOrBarCode codeInfo={codeInfo} size={'large'} />
      </div>
    </Modal>
  );
  // return (
  //   <div className={'code-card'}>
  //     <div>{codeInfo.title}</div>
  //     <QrOrBarCode codeInfo={codeInfo} size={'large'} />
  //     <div>Значение: {text}</div>
  //     <div>Формат: {format}</div>
  //     <button
  //       onClick={() =>
  //         deleteScan(codeInfo.id)
  //           .then(() => onDelete())
  //           .catch(console.error)
  //       }
  //     >
  //       удалить
  //     </button>
  //     <button onClick={onClose}>Закрыть</button>
  //   </div>
  // );
};

export default CodeCard;
