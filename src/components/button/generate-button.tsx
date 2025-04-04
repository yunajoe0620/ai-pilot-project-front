import styled from "styled-components";

interface GenerateButtonProps {
  children: React.ReactNode;
  active: boolean;
}

function GenerateButton({ active, children }: GenerateButtonProps) {
  return <Button active={active}>{children}</Button>;
}

export default GenerateButton;

const Button = styled.button<{ active?: boolean }>`
  display: inline-flex;
  padding: 20px 52px;
  justify-content: center;
  align-items: center;
  border-radius: 999999px;
  background: ${({ active }) => (active ? "#7789FF" : "#F4F5FA")};
  color: ${({ active }) => (active ? "#FFF" : "#B7B7C9")};

  border: none;
  outline: none;
  text-align: center;
  font-family: "Helvetica Neue";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 135%;
  letter-spacing: -0.3px;
  cursor: pointer;

  &:hover {
    background-color: #98a6ff;
    color: #fff;
  }
`;
