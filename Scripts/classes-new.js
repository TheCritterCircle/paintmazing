class Sprite {
  contructor(img) {
    this.img = img
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}

class GameObject {
  position = {
    x: 0,
    y: 0
  }
  constructor(x, y, sprite) {
    this.position.x = x;
    this.position.y = y;
    this.sprite = sprite
  }
}

class MovingObject extends GameObject {
  velocity = {
    x: 0,
    y: 0
  }

  modifyVelocity(v) {
    this.velocity.x += v.x
    this.velocity.y += v.y
  }
}

class Ball extends MovingObject {
}