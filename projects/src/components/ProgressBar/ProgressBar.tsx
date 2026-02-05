import { useEffect, useState } from 'react';
import './ProgressBar.css';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleStepChange = (event: Event) => {
      const allSteps = Array.from(document.querySelectorAll('.step'));
      const currentStep = allSteps.indexOf(event.target as Element);
      const progressPercentage = (currentStep / (allSteps.length - 1)) * 100;
      setProgress(progressPercentage);
    };

    document.addEventListener('impress:stepenter', handleStepChange);

    return () => {
      document.removeEventListener('impress:stepenter', handleStepChange);
    };
  }, []);

  return (
    <div
      className="progress-bar"
      id="progress"
      style={{ width: `${progress}%` }}
    />
  );
};

export default ProgressBar;
