"use client";

import { useSearchParams } from "next/navigation";
import { ConnectedLayers } from "./ConnectedLayers";
import { ConnectedStagesCards } from "./ConnectedStagesCards";
import { ConnectedStagesMinimal } from "./ConnectedStagesMinimal";

export function StagesSection() {
  const params = useSearchParams();
  const variant = params.get("variant");
  if (variant === "minimal") return <ConnectedStagesMinimal />;
  if (variant === "cards") return <ConnectedStagesCards />;
  return <ConnectedLayers />;
}
