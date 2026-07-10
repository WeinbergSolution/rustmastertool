
import './RaidCalculatorWorkbenchFrame.css';
import { RaidCalculator } from './RaidCalculator';

import workbenchImg from '../../../assets/Gemini_Generated_Image_4ana8h4ana8h4ana.png';

export function RaidCalculatorWorkbenchFrame() {
  return (
    <div className="workbench-frame-container" style={{ backgroundImage: `url(${workbenchImg})` }}>
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
