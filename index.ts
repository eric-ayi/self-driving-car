import { getObstacleEvents } from "./computer-vision";

interface Events {
  [obstacleDirection: string]: boolean;
}

interface AutonomousCar {
  isRunning?: boolean;
  respond: (events: Events) => void;
}
interface AutonomousCarProps {
  isRunning?: boolean;
  steeringControl: Steering;
  speedControl: Speed;
  brakeControl: Brake;
}

interface Control {
  execute: (command: string) => void;
}

interface Steering extends Control {
  turn: (direction: string) => void;
}

interface Speed extends Control {
  change: (speed: string) => void;
}

interface Brake extends Control {
  brake: (stop: string) => void;
}

class Car implements AutonomousCar {
  isRunning;
  steeringControl;
  speedControl;
  brakeControl;
  constructor(props: AutonomousCarProps) {
    this.isRunning = props.isRunning;
    this.steeringControl = props.steeringControl;
    this.speedControl = props.speedControl;
    this.brakeControl = props.brakeControl;
  }
  respond(events: Events) {
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

class SteeringControl implements Steering {
  execute(command: string) {
    console.log(`Executing: ${command}`);
  }
  turn(direction: string) {
    this.execute(`turn ${direction}`);
  }
}

class SpeedControl implements Speed {
  execute(command: string) {
    console.log(`Executing: ${command}`);
  }
  change(speed: string) {
    this.execute(`${speed}`);
  }
}

class BrakeControl implements Brake {
  execute(command: string) {
    console.log(`Executing: ${command}`);
  }
  brake(stop: string) {
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
  autonomousCar.respond(getObstacleEvents());
}
