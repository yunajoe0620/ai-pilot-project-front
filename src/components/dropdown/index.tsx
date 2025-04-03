import styled from "styled-components";

interface DropDownProps {
  itemArray?: string[];
  size?: "sm" | "md" | "lg";
}

function Dropdown({ itemArray, size = "sm" }: DropDownProps) {
  const handleCountrySelect = () => {};

  // 직접 입력할떄 handlers
  const handleCountryDirect = () => {};

  return (
    <Contaniner size={size}>
      {/* placeholder쪽 */}
      <TypeDirectContainer onClick={handleCountryDirect}>
        <div>과목을 선택해주세요</div>
        <img src="../../../src/assets/arrow-down.svg" />
      </TypeDirectContainer>

      <CountryCodeArrayContainer>
        {itemArray?.map((item, index) => {
          return (
            <ItemContainer key={index} onClick={() => {}}>
              {/* <Code>{item.code}</Code>
              <Country>{item.country}</Country> */}
            </ItemContainer>
          );
        })}
      </CountryCodeArrayContainer>
    </Contaniner>
  );
}

export default Dropdown;

const Contaniner = styled.div<{ size?: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TypeDirectContainer = styled.div<{ size?: number }>`
  box-sizing: border-box;
  display: flex;
  width: 178px;
  padding: 16px 24px 16px 32px;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 999999px;
  border: 2px solid #e0e6fa;
  background: #fff;
`;

const CountryCodeArrayContainer = styled.div``;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  width: 100%;
  flex-shrink: 0;
  cursor: pointer;
  padding: 10px 4px;
  box-sizing: border-box;
  &:hover {
    background: var(--Gray-Gary-10, #f5f5f8);
  }
`;

const Code = styled.p`
  overflow: hidden;
  color: var(--Gray-Gray-30, #c8cbd9);
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 400;
  line-height: 135%;
  letter-spacing: -0.48px;
`;
const Country = styled.p`
  overflow: hidden;
  color: var(--Text-secondary-color, #5a5b63);
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 400;
  line-height: 135%;
  letter-spacing: -0.48px;
`;
