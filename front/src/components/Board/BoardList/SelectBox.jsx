import { useState } from "react";
import { styled } from "styled-components";
import { BsChevronDown } from "react-icons/bs";

const CustomSelect = styled.div`
  position: relative;
  width: 160px;
  cursor: pointer;
`;

const CustomSelectTrigger = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 10px;
  background-color: var(--LIGHT);
  white-space: nowrap;
  color: var(--TEXT_SECONDARY);
  font-size: 14px;
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

const SelectBox = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0].label);

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    onChange({ target: { value: option.value } });
  };

  return (
    <CustomSelect>
      <CustomSelectTrigger onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
        <CustomDownIcon />
      </CustomSelectTrigger>
      {isOpen && (
        <CustomSelectOptions>
          {options.map((option, index) => (
            <CustomOption key={index} onClick={() => handleOptionClick(option)}>
              {option.label}
            </CustomOption>
          ))}
        </CustomSelectOptions>
      )}
    </CustomSelect>
  );
};

export default SelectBox;
