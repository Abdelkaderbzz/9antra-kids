import { ReactComponent as CopyIcon } from '../../assets/icons/popup/clip.svg'

interface ICopyClipBoard {
  onClick: () => void
  className?: string
}
export default function CopyClipBoard({ onClick, className }: ICopyClipBoard) {
  return <CopyIcon onClick={onClick} className={`copy_messagae ${className}`} />
}
