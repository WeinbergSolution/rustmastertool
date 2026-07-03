export function simulatePollingBudget() {
  const scenarios = [50, 500, 5000, 50000];
  const distribution = { hot: 0.1, warm: 0.3, cold: 0.6 };
  
  console.log('--- Polling Budget Simulation ---');
  
  for (const total of scenarios) {
    const hotCount = Math.floor(total * distribution.hot);
    const warmCount = Math.floor(total * distribution.warm);
    const coldCount = Math.floor(total * distribution.cold);
    
    // Ideal rates
    const idealHotRpm = hotCount / 1; // 60s
    const idealWarmRpm = warmCount / 5; // 5m
    const idealColdRpm = coldCount / 60; // 60m
    const idealTotalRpm = idealHotRpm + idealWarmRpm + idealColdRpm;
    
    console.log(`\nScenario: ${total} distinct servers`);
    console.log(`Ideal Requests per Minute: ${Math.round(idealTotalRpm)}`);
    console.log(`Ideal Requests per Hour: ${Math.round(idealTotalRpm * 60)}`);
    console.log(`Ideal Requests per Day: ${Math.round(idealTotalRpm * 60 * 24)}`);
    
    // Degradation trigger (assuming limit is 600 RPM for free/low tier)
    const limitRpm = 600;
    if (idealTotalRpm > limitRpm) {
      console.log(`[DEGRADATION TRIGGERED] Limit of ${limitRpm} RPM exceeded.`);
      // Protect hot, stretch warm and cold
      const degradedWarmRpm = warmCount / 15;
      const degradedColdRpm = coldCount / 180;
      const degradedTotalRpm = idealHotRpm + degradedWarmRpm + degradedColdRpm;
      
      console.log(`Degraded Requests per Minute: ${Math.round(degradedTotalRpm)}`);
      console.log(`Visible User Degradation: Warm data delayed up to 15m, Cold up to 3h.`);
    }
  }
}
