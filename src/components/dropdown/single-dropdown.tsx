import { useEffect, useState } from "react";
import styled from "styled-components";

interface KeyItemArray {
  [key: string]: any[];
}

interface DropDownProps {
  isEdit?: boolean;
  placeholder: string;
  size?: "sm" | "md" | "lg";
  isDropdown?: boolean;
  setIsDropdown?: React.Dispatch<React.SetStateAction<boolean>> | null;
  itemKey: string | null;
  itemArray: KeyItemArray;
  selectedValue: string;
  handleDropdown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  alertMessage?: string;
}

function SingleDropdown({
  isEdit = true,
  placeholder,
  size = "sm",
  isDropdown,
  setIsDropdown,
  itemKey,
  itemArray,
  selectedValue,
  handleDropdown,
  alertMessage,
}: DropDownProps) {
  const [itemList, setItemList] = useState<string[]>([]);

  const handleDropDown = () => {
    if (!itemKey) {
      alert(alertMessage);
      return;
    }
    if (!setIsDropdown) return;

    setIsDropdown(!isDropdown);
  };

  useEffect(() => {
    if (!itemKey) return;
    const result = itemArray[itemKey];

    setItemList(result);
  }, [itemKey]);

  return (
    <Contaniner isEdit={isEdit}>
      <TypeDirectContainer onClick={handleDropDown} size={size}>
        <PlaceHolder selectValue={selectedValue}>
          {selectedValue ? selectedValue : placeholder}
        </PlaceHolder>
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
              <ItemContainer
                key={index}
                onClick={(e) => {
                  if (!handleDropdown) return;
                  if (!setIsDropdown) return;
                  handleDropdown(e);
                  setIsDropdown(!isDropdown);
                }}
              >
                {item}
              </ItemContainer>
            );
          })}
        </CountryCodeArrayContainer>
      )}
    </Contaniner>
  );
}

export default SingleDropdown;

const Contaniner = styled.div<{ isEdit: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: ${({ isEdit }) => (isEdit ? "pointer" : "not-allowed")};
  flex: 1;
  box-sizing: border-box;
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

const PlaceHolder = styled.div<{ selectValue?: string | null }>`
  color: #aeaebf;
  color: ${({ selectValue }) => (selectValue ? "#58576e" : "#aeaebf")};
  text-align: center;
  font-family: "NEXON Lv2 Gothic";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 135%;
  letter-spacing: -0.27px;
`;
