import { hexToHsva } from "@uiw/color-convert";
import Wheel from "@uiw/react-color-wheel";
import { useState } from "react";

type ColorPickerProps = {
  color: string;
  onChange: (color: string) => void;
};

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [colorEdited, setColorEdited] = useState<string>(color);

  const handleChange = (color: string) => {
    setColorEdited(color);
    onChange(color);
  };

  return (
    <Wheel
      color={hexToHsva(colorEdited)}
      onChange={(color) => handleChange(color.hex)}
    />
  );
}
