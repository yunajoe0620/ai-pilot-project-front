import { useEffect, useState } from "react";
import styled from "styled-components";

interface DropDownProps {
  placeholder: string;
  size?: "sm" | "md" | "lg";
  isDropdown: boolean;
  setIsDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  itemKey: string | null;
  itemArray: any;
  handleSelectValue: (e: any) => void;
}

function Dropdown({
  placeholder,
  isDropdown,
  setIsDropdown,
  itemKey,
  itemArray,
  handleSelectValue,
  size = "sm",
}: DropDownProps) {
  const [itemList, setItemList] = useState<string[]>([]);

  // dropdown Open하는거
  const handleDropDown = () => {
    setIsDropdown(!isDropdown);
  };

  useEffect(() => {
    if (!itemKey) return;
    const result = itemArray[itemKey];
    setItemList(result);
  }, [itemKey]);

  // console.log("스쿠우울", itemKey);
  // console.log("itemARray", itemArray);

  return (
    <Contaniner>
      <TypeDirectContainer onClick={handleDropDown} size={size}>
        <PlaceHolder>{placeholder}</PlaceHolder>
        {!isDropdown ? (
          <img src="../../../src/assets/arrow-down.svg" />
        ) : (
          <img src="../../../src/assets/arrow-up.svg" />
        )}
      </TypeDirectContainer>
      {isDropdown && itemList.length > 0 && (
        <CountryCodeArrayContainer>
          {itemList.map((item, index) => {
            return (
              <ItemContainer key={index} onClick={(e) => handleSelectValue(e)}>
                {item}
              </ItemContainer>
            );
          })}
        </CountryCodeArrayContainer>
      )}
    </Contaniner>
  );
}

export default Dropdown;

const Contaniner = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
`;

const TypeDirectContainer = styled.div<{ size?: string }>`
  box-sizing: border-box;
  display: flex;

  width: ${({ size }) => (size === "sm" ? "178px" : "100%")};
  padding: 16px 24px 16px 32px;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 999999px;
  border: 2px solid #e0e6fa;
  background: #fff;
`;

const CountryCodeArrayContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: absolute;
  top: 110%;
  z-index: 1000;
  border-radius: 20px;
  border: 2px solid #e0e6fa;
  background: #fff;
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;

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
    background: #f2f5ff;
  }
`;

const PlaceHolder = styled.div`
  color: #aeaebf;
  text-align: center;
  font-family: "NEXON Lv2 Gothic";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 135%; /* 24.3px */
  letter-spacing: -0.27px;
  box-sizing: border-box;
`;
