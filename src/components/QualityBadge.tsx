import { Quality } from "~/utils/types";
import { Badge } from "./ui/Badge";
import { cn } from "~/utils/tw";

type QualityBadge = {
  quality: Quality;
};

const qualityColorsMap: Record<Quality, { bg: string; text: string }> = {
  [Quality.Bad]: { bg: "bg-red-600", text: "text-red-900" },
  [Quality.Good]: { bg: "bg-green-600", text: "text-green-900" },
  [Quality.Ok]: { bg: "bg-yellow-500", text: "text-yellow-700" },
};

export const QualityBadge = ({ quality }: QualityBadge) => {
  const colors = qualityColorsMap[quality];
  return <Badge className={cn(colors.bg, colors.text)}>{quality}</Badge>;
};
