import React from "react";
import Sketch from "react-p5";

export const Background = (props) => {
  let font = null;
  let particles = [];

  const setup = (p5, parentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(parentRef);
    p5.colorMode(p5.HSB);
    const size = 400;
    const points = font.textToPoints("gm", window.innerWidth / 2 - size / 1.5, window.innerHeight / 2 - size / 5, size);
    particles.push(...points.map((p) => new Agent(p5, p5.createVector(p.x, p.y))));
  };

  const draw = (p5) => {
    p5.background(0);

    // Draw each particle on the screen
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
  };

  const preload = (p5) => {
    font = p5.loadFont(props.font);
  };

  const mouseClicked = (p5) => {
    particles.forEach((particle) => {
      particle.startAnimation();
    });
  };

  return <Sketch setup={setup} draw={draw} preload={preload} mouseClicked={mouseClicked} />;
};

class Agent {
  p;
  position;
  velocity;
  acceleration;
  maxSpeed;
  maxForce;
  target;
  evadeDistance = 100;
  wanderAngle = 0;
  wallBuffer = 50;

  started = false;
  history = [];

  constructor(p, target) {
    this.p = p;
    this.target = target;
    this.position = p.createVector(
      p.random(this.wallBuffer, p.width - this.wallBuffer),
      p.random(this.wallBuffer, p.height - this.wallBuffer)
    );
    this.velocity = p.createVector(0, 0);
    this.acceleration = p.createVector(p.random(-0.01, 0.01), p.random(-0.01, 0.01));
    this.maxSpeed = 3;
    this.maxForce = 0.3;
  }

  startAnimation = () => {
    this.started = true;
  };

  applyForce(v) {
    this.acceleration.add(v);
  }

  arrive(target) {
    const slowRadius = 100;
    const desired = target.copy().sub(this.position);
    const dist = desired.mag();
    if (dist <= slowRadius) {
      const desiredSpeed = this.p.map(dist, 0, slowRadius, 0, this.maxSpeed);
      desired.setMag(desiredSpeed);
    } else {
      desired.setMag(this.maxSpeed);
    }

    const steering = desired.copy().sub(this.velocity);
    steering.limit(this.maxForce);
    return steering;
  }

  flee(target) {
    if (target.dist(this.position) > this.evadeDistance) {
      return this.p.createVector(0, 0);
    }
    return this.seek(target).mult(-1);
  }

  wander() {
    // Set point 100px ahead of current velocity
    const wanderPoint = this.position.copy();
    const target = this.velocity.copy();
    target.setMag(100);
    wanderPoint.add(target);

    // Find a new target point on a cirlce around the wander point
    const theta = this.wanderAngle + this.velocity.heading();
    const wanderRadius = 50;
    const x = wanderRadius * this.p.cos(theta);
    const y = wanderRadius * this.p.sin(theta);
    wanderPoint.add(x, y);

    // Update angle to continue from there.
    this.wanderAngle += this.p.random(-0.4, 0.4);

    // Seek towards the new target point
    return this.seek(wanderPoint).limit(0.01);
  }

  seek(target) {
    const desired = target.copy().sub(this.position).setMag(this.maxSpeed);
    return desired.copy().sub(this.velocity).limit(this.maxForce);
  }

  avoidWalls() {
    let desired = null;
    if (this.position.x < this.wallBuffer) {
      desired = this.p.createVector(this.maxSpeed, this.velocity.y);
    }
    if (this.position.x > this.p.windowWidth - this.wallBuffer) {
      desired = this.p.createVector(-this.maxSpeed, this.velocity.y);
    }

    if (this.position.y < this.wallBuffer) {
      desired = this.p.createVector(this.velocity.x, this.maxSpeed);
    }
    if (this.position.y > this.p.windowHeight - this.wallBuffer) {
      desired = this.p.createVector(this.velocity.x, -this.maxSpeed);
    }
    if (desired !== null) {
      desired.normalize();
      return desired.mult(this.maxSpeed).sub(this.velocity).limit(this.maxForce);
    }
    return this.p.createVector(0, 0);
  }

  update() {
    this.history.unshift(this.position.copy());
    this.history.splice(4, this.history.length);

    // run behaviours
    this.applyForce(this.wander());
    this.applyForce(this.flee(this.p.createVector(this.p.mouseX, this.p.mouseY)));
    if (this.started) {
      this.applyForce(this.arrive(this.target));
    }

    this.applyForce(this.avoidWalls());

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  // TODO: This should be abstract and inhereted classes should draw themselves.
  draw() {
    // this.p.push();
    this.p.strokeWeight(2);
    let hue = this.p.map(this.position.x, 0, this.p.width, 0, 255);
    // let alphaY = this.p.map(this.position.y, 0, this.p.height, 1, 0.2);

    let alphaL = this.p.map(this.position.x, 0, this.p.width / 2, 0.2, 1);
    let alphaR = this.p.map(this.position.x, this.p.width, this.p.width / 2, 0.2, 1);

    this.p.stroke(hue, 255, 255, Math.min(alphaL, alphaR));

    // Translated
    // this.p.translate(this.position.x, this.position.y);
    // this.p.rotate(this.velocity.heading());
    // this.p.ellipse(0, 0, 2, 2);

    // Not translated
    // Draw an ellipse at the current position
    this.p.point(this.position.x, this.position.y);

    this.p.push();
    // this.p.fill(0, 200, 0, 100);

    // this.p.stroke(200, 200, 200, 200);
    this.p.beginShape();
    for (let h of this.history) {
      this.p.vertex(h.x, h.y);
    }
    this.p.endShape();
    this.p.pop();
  }
}
