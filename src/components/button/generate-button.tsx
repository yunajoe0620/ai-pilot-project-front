import styled from "styled-components";
import { ButtonColor } from "../../utils/button";

interface GenerateButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  color: "primary" | "default";
}

function GenerateButton({
  active,
  children,
  onClick,
  color = "primary",
  size = "md",
}: GenerateButtonProps) {
  return (
    <Button active={active} onClick={onClick} size={size} color={color}>
      {children}
    </Button>
  );
}

export default GenerateButton;

const Button = styled.button<{
  active?: boolean;
  size?: string;
  color: string;
}>`
  /* padding: 20px 52px; */
  /* padding: 20px 52px; */
  padding: 20px 0;
  justify-content: center;
  align-items: center;
  border-radius: 999999px;
  background-color: ${({ active, color }) =>
    active
      ? ButtonColor[color]["backGround"]["active"]
      : ButtonColor[color]["backGround"]["disabled"]};

  color: ${({ active, color }) =>
    active
      ? ButtonColor[color]["color"]["active"]
      : ButtonColor[color]["color"]["disabled"]};

  border: none;
  outline: none;
  text-align: center;
  font-family: "Helvetica Neue";
  font-size: 20px;
  font-weight: 700;
  line-height: 135%;
  letter-spacing: -0.3px;
  cursor: pointer;
  width: ${({ size }) =>
    size === "sm" ? "200px" : size === "md" ? "260px" : "100%"};

  &:hover {
    background-color: ${({ active, color }) =>
      active ? null : ButtonColor[color]["backGround"]["hover"]};

    color: ${({ active, color }) =>
      active ? null : ButtonColor[color]["color"]["hover"]};
  }
`;
