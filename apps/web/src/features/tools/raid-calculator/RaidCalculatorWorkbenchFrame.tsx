
import './RaidCalculatorWorkbenchFrame.css';
import { RaidCalculator } from './RaidCalculator';

export function RaidCalculatorWorkbenchFrame() {
  return (
    <div className="workbench-frame-container">
      <div className="workbench-image-wrapper">
        <div className="workbench-screen-overlay">
          <div className="screen-scanlines"></div>
          <div className="screen-content">
            <RaidCalculator />
          </div>
        </div>
      </div>
    </div>
  );
}
