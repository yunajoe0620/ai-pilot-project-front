import { RefObject, useEffect } from "react";
import useOnClickOutside from "../../hooks/use-onclick-outside";

interface IframProps {
  url: string | null;
  modalRef: RefObject<HTMLIFrameElement | null>;
  handleModalClose: () => void;
}

function Iframe({ url, modalRef, handleModalClose }: IframProps) {
  useOnClickOutside(modalRef, handleModalClose, "mousedown");

  if (!url) return;

  if (!modalRef) return;

  console.log("modalRef", modalRef);

  useEffect(() => {}, [modalRef]);

  return (
    <iframe
      onClick={handleModalClose}
      ref={modalRef}
      src={url} // 생성된 PDF URL을 iframe에 설정
      width="100%"
      height="800px"
      title="PDF Viewer"
    />
  );
}

export default Iframe;
