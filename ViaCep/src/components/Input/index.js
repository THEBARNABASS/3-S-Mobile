import { InputText } from "./style";

export const Input = ({
  placeholder,
  editable,
  fieldValue,
  onChangeText,
  keyType,
  maxLength,
  minLength,
  keyboardType,
  onBlur
}) => {
  return(
    <InputText
      placeholder={placeholder}
      editable={editable}
      value={fieldValue}
      onChangeText={onChangeText}
      keyType={keyType}
      maxLength={maxLength}
      minLength={minLength}
      keyboardType={keyboardType}
      onBlur={onBlur}
    />
  );
};