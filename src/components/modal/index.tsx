interface ModalPortalProps {
  children: ReactNode;
}

import { ReactNode } from "react";
import { createPortal } from "react-dom";

function ModalPortal({ children }: ModalPortalProps) {
  return <div>{createPortal(children, document.body)}</div>;
}

export default ModalPortal;
