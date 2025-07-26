export type ScannerProps = {
  onSuccessScan: (result: ScanResult) => void
}

export type ScannerModes = 'scan' | 'configure'

export type ScanResult = {
  title: string
  text: string
  format: 'AZTEC'
    | 'CODABAR'
    | 'CODE_39'
    | 'CODE_93'
    | 'CODE_128'
    | 'DATA_MATRIX'
    | 'EAN_8'
    | 'EAN_13'
    | 'ITF'
    | 'MAXICODE'
    | 'PDF_417'
    | 'QR_CODE'
    | 'RSS_14'
    | 'RSS_EXPANDED'
    | 'UPC_A'
    | 'UPC_E'
    | 'UPC_EAN_EXTENSION'
}
