import { ReactNode } from "react";
import styled from "styled-components";

interface ModalBackgroundProps {
  children: ReactNode;
}
function ModalBackground({ children }: ModalBackgroundProps) {
  return (
    <ModalWrapper>
      <ModalContent>{children}</ModalContent>
    </ModalWrapper>
  );
}

export default ModalBackground;

const ModalWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
`;

const ModalContent = styled.div`
  width: 80%;
  position: relative;
  top: 20px;
  height: 800px;
`;
