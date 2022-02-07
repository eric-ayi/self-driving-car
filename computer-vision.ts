export function getObstacleEvents() {
  const coinFlip = Boolean(Math.random() > 0.5);
  const speedFlip = Boolean(Math.random() > 0.5);
  const brakeFlip = Boolean(Math.random() > 0.5);
  return {
    ObstacleLeft: coinFlip,
    ObstacleRight: !coinFlip,
    Slope: speedFlip,
    Hill: !speedFlip,
    ParallelPark: brakeFlip,
    EmergencyBrake: !brakeFlip,
  };
}
