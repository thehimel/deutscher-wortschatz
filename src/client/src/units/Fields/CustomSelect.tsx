import {Select, SelectItem} from "@nextui-org/react";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import {SelectorChoice} from "../../store/base/baseSlice.ts";
import TextAvatar from "../Avatar/TextAvatar.tsx";

interface CustomInputProps {
  fields: UseFormRegisterReturn;
  value: string;
  label: string;
  placeholder: string;
  items: SelectorChoice[];
  errorMessage?: string;
  isSubmitting: boolean;
  defaultKey: string;
}

const CustomSelect: React.FC<CustomInputProps> = ({
  fields, value, label, placeholder, items, errorMessage, isSubmitting, defaultKey, ...props
}) => {
  return (
    <Select
      {...fields}
      {...props}
      variant="bordered"
      autoComplete="off"
      value={value}
      label={label}
      placeholder={placeholder}
      items={items}
      isInvalid={!!errorMessage}
      errorMessage={errorMessage}
      isDisabled={isSubmitting}
      defaultSelectedKeys={defaultKey? [defaultKey] : []}
      hidden={false}
    >
      {(item) => (
        <SelectItem
          key={item.key}
          startContent={<TextAvatar text={item.key} animate={true}/>}
        >
          {item.label}
        </SelectItem>
      )}
    </Select>
  );
};

export default CustomSelect;