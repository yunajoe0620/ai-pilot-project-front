import { JSX } from "react";
import ModalPortal from ".";
import ModalBackground from "./modal-background";

interface ModalComponentProps {
  component?: JSX.Element;
}

function ModalComponent({ component }: ModalComponentProps) {
  return (
    <ModalPortal>
      <ModalBackground>{component}</ModalBackground>
    </ModalPortal>
  );
}

export default ModalComponent;
