"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const computer_vision_1 = require("./computer-vision");
class Car {
    constructor(props) {
        this.isRunning = props.isRunning;
        this.steeringControl = props.steeringControl;
        this.speedControl = props.speedControl;
        this.brakeControl = props.brakeControl;
    }
    respond(events) {
        if (!this.isRunning) {
            return console.log("Engine is off");
        }
        Object.keys(events).forEach((eventKey) => {
            if (!events[eventKey]) {
                return;
            }
            if (eventKey === "ObstacleLeft") {
                this.steeringControl.turn("right");
            }
            if (eventKey === "ObstacleRight") {
                this.steeringControl.turn("left");
            }
            if (eventKey === "Slope") {
                this.speedControl.change("Slow down");
            }
            if (eventKey === "Hill") {
                this.speedControl.change("Speed up");
            }
            if (eventKey === "ParallelPark") {
                this.brakeControl.brake("Parking");
            }
            if (eventKey === "EmergencyBrake") {
                this.brakeControl.brake("Halting");
            }
        });
    }
}
class SteeringControl {
    execute(command) {
        console.log(`Executing: ${command}`);
    }
    turn(direction) {
        this.execute(`turn ${direction}`);
    }
}
class SpeedControl {
    execute(command) {
        console.log(`Executing: ${command}`);
    }
    change(speed) {
        this.execute(`${speed}`);
    }
}
class BrakeControl {
    execute(command) {
        console.log(`Executing: ${command}`);
    }
    brake(stop) {
        this.execute(`${stop}`);
    }
}
const steering = new SteeringControl();
// steering.turn('right');
const speed = new SpeedControl();
const brake = new BrakeControl();
const autonomousCar = new Car({
    isRunning: true,
    steeringControl: steering,
    speedControl: speed,
    brakeControl: brake,
});
for (let i = 0; i < 5; i++) {
    autonomousCar.respond((0, computer_vision_1.getObstacleEvents)());
}
