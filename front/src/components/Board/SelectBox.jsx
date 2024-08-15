import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { BsChevronDown } from "react-icons/bs";

const CustomSelect = styled.div`
  position: relative;
  width: 160px;
  cursor: ${({ isedit }) => (isedit==="true" ? "not-allowed" : "pointer")};
`;

const CustomSelectTrigger = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 10px;
  background-color: ${({ isedit }) => (isedit==="true" ? "var(--BACKGROUND_COLOR)" : "var(--LIGHT)")};
  white-space: nowrap;
  color: var(--TEXT_SECONDARY);
  font-size: 14px;
  pointer-events: ${({ isedit }) => (isedit==="true" ? "none" : "auto")};

  &:hover > div {
    display: block;
  }
`;

const CustomSelectOptions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  white-space: nowrap;
  background-color: var(--LIGHT);
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 10px;
  overflow: hidden;
  z-index: 1;

  display: none;
`;

const CustomOption = styled.div`
  padding: 8px;
  color: var(--TEXT_SECONDARY);
  font-size: 14px;
  white-space: nowrap;
  &:hover {
    background-color: var(--BACKGROUND_COLOR);
  }
`;

const CustomDownIcon = styled(BsChevronDown)`
  color: var(--TEXT_SECONDARY);
  font-size: 16px;
`;

const SelectBox = ({ options, curOption, onChange, isedit }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    onChange(option.value);
  };

  useEffect(() => {
    const selected = options.find((option) => option.value === curOption);
    setSelectedOption(selected ? selected.label : options[0].label);
  }, [curOption, options]);

  return (
    <CustomSelect isedit={isedit}>
      <CustomSelectTrigger isedit={isedit}>
        {selectedOption}
        <CustomDownIcon />
        {isedit!=="true" && (
          <CustomSelectOptions>
            {options.map((option, index) => (
              <CustomOption key={index} onClick={() => handleOptionClick(option)}>
                {option.label}
              </CustomOption>
            ))}
          </CustomSelectOptions>
        )}
      </CustomSelectTrigger>
    </CustomSelect>
  );
};

export default SelectBox;
