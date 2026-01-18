import { useState } from "react";

export const useTimelineProgress = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  return { currentStep, nextStep };
};
