import { ReactNode } from "react";

interface ModalBackgroundProps {
  children: ReactNode;
}
function ModalBackground({ children }: ModalBackgroundProps) {
  return (
    <div className="absolute flex justify-center top-0 left-0 w-full h-full bg-opacity-25">
      <p className="w-4/5 relative top-20 h-[800px]">{children}</p>
    </div>
  );
}

export default ModalBackground;
