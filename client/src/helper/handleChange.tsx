import { ChangeEvent } from "react";

export const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
  console.log("Label 👉️", event.target.selectedOptions[0].label);
  console.log(event.target.value);
};
