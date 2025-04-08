import styled from "styled-components";

interface ButtonProps {
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  selected: boolean;
  isClickable?: boolean;
  onClick?: () => void;
}

function SelectButton({
  selected,
  children,
  onClick,
  isClickable = true,
}: ButtonProps) {
  return (
    <Button onClick={onClick} selected={selected} isClickable={isClickable}>
      {children}
    </Button>
  );
}

export default SelectButton;

const Button = styled.button<{
  selected?: boolean;
  size?: string;
  isClickable?: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  padding: 16px;
  height: 56px;
  width: 146px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 999999px;
  border: 2px solid #e0e6fa;
  background: ${({ selected }) => (selected ? "#7789FF" : "#FFF")};
  cursor: ${({ isClickable }) => (isClickable ? "pointer" : "not-allowed")};
  color: ${({ selected }) => (selected ? "#FFF" : "#8E8E96")};
  text-align: center;
  font-family: "NEXON Lv2 Gothic";
  font-size: 18px;
  font-weight: 500;
  line-height: 135%;
  letter-spacing: -0.27px;

  /* TODO:  isClickable 이 false일떄는 hover작동 안하게 하기 */
  &:hover {
    ${({ selected, isClickable }) =>
      selected || !isClickable
        ? null
        : `color: #fff;
    background: #98a6ff;
    `}
  }
`;
