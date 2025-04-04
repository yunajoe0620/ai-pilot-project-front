import styled from "styled-components";

interface ButtonProps {
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  selected: boolean;
}

function SelectButton({ selected, children }: ButtonProps) {
  return <Button selected={selected}>{children}</Button>;
}

export default SelectButton;

const Button = styled.button<{ selected?: boolean; size?: string }>`
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
  cursor: pointer;
  color: #8e8e96;
  color: ${({ selected }) => (selected ? "#FFF" : "#8E8E96")};
  text-align: center;
  font-family: "NEXON Lv2 Gothic";
  font-size: 18px;
  font-weight: 500;
  line-height: 135%;
  letter-spacing: -0.27px;

  &:hover {
    ${({ selected }) =>
      selected
        ? null
        : `color: #fff;
    background: #98a6ff;
    `}
  }
`;
