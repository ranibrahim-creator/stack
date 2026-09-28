"use client";

import { useEffect, useState } from "react";
import { ConnectedLayers } from "./ConnectedLayers";
import { ConnectedStagesCards } from "./ConnectedStagesCards";
import { ConnectedStagesMinimal } from "./ConnectedStagesMinimal";

export function StagesSection() {
  const [variant, setVariant] = useState<string | null>(null);

  useEffect(() => {
    setVariant(new URLSearchParams(window.location.search).get("variant"));
  }, []);

  if (variant === "cards") return <ConnectedStagesCards />;
  if (variant === "original") return <ConnectedLayers />;
  return <ConnectedStagesMinimal />;
}
