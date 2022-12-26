import type { FunctionComponent } from "react";
import Select from "react-select";

type InheritedStyles = { [key: string]: string };

const styles = {
  control: (provided: InheritedStyles) => ({
    ...provided,
    backgroundColor: "#25252B",
    borderWidth: "0",
    padding: "0.3rem",
  }),
  menu: (provided: InheritedStyles) => ({
    ...provided,
    backgroundColor: "#2F2F39",
  }),
  option: (provided: InheritedStyles) => ({
    ...provided,
    color: "#fff",
    backgroundColor: "",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#2B2B33",
    },
  }),
  multiValue: (provided: InheritedStyles) => ({
    ...provided,
    backgroundColor: "#1E1E23",
    padding: "0.2rem 0.3rem",
    borderRadius: "0.25rem",
    fontSize: "1.2rem",
  }),
  multiValueLabel: (provided: InheritedStyles) => ({
    ...provided,
    color: "#fff",
    marginRight: "0.2rem",
  }),
  multiValueRemove: (provided: InheritedStyles) => ({
    ...provided,
    color: "#fff",
    padding: "0.25rem",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#F87171",
    },
  }),
  clearIndicator: (provided: InheritedStyles) => ({
    ...provided,
    cursor: "pointer",
    color: "#9CA3AF",
    "&:hover": {
      color: "#fff",
    },
  }),
  dropdownIndicator: (provided: InheritedStyles) => ({
    ...provided,
    cursor: "pointer",
    color: "#9CA3AF",
    "&:hover": {
      color: "#fff",
    },
    borderWidth: "0",
  }),
  indicatorSeparator: (provided: InheritedStyles) => ({
    ...provided,
    backgroundColor: "#374151",
    width: "2px",
  }),
};

const CustomSelect: FunctionComponent<any> = (props) => {
  return <Select styles={styles} {...props} />;
};

export default CustomSelect;
