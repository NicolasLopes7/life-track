import { Quality } from "~/utils/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";

type SelectQualityProps = {
  value: Quality;
  onChange: (value: Quality) => void;
};

export const SelectQuality = ({ value, onChange }: SelectQualityProps) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger id="quality" className="w-[180px]">
      <SelectValue placeholder="Select the quality" />
    </SelectTrigger>
    <SelectContent>
      {Object.entries(Quality).map(([label, value]) => (
        <SelectItem key={label} value={value}>
          {label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
