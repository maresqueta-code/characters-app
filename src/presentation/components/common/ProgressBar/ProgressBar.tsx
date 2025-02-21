import { useEffect, useState } from 'react';
import { useIsFetching } from '@tanstack/react-query';
import './ProgressBar.css';

export function ProgressBar() {
  const isFetching = useIsFetching();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;
    if (isFetching > 0) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 90 : prev + 5));
      }, 100);
    } else {
      setProgress(100);
      timeout = setTimeout(() => setProgress(0), 300);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isFetching]);

  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
