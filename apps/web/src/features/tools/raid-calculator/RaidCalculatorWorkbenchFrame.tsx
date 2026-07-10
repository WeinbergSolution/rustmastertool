
import './RaidCalculatorWorkbenchFrame.css';
import { RaidCalculator } from './RaidCalculator';

export function RaidCalculatorWorkbenchFrame() {
  return (
    <div className="workbench-frame-container">
      <div className="workbench-monitor-bezel">
        <div className="workbench-screen">
          <div className="screen-scanlines"></div>
          <div className="screen-content">
            <RaidCalculator />
          </div>
        </div>
      </div>
    </div>
  );
}
