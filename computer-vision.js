"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObstacleEvents = void 0;
function getObstacleEvents() {
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
exports.getObstacleEvents = getObstacleEvents;
