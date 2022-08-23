class Sprite {
  position = DEFAULT_POSITION

  contructor(img, {pos: {x, y}, width, height}) {
    this.img = img

    this.position.x = pos[x] ?? 0
    this.position.y = pos[y] ?? 0

    this.width = width ?? img.width
    this.height = height ?? img.height
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  scale({width, height}) {
    this.width = width ?? this.width
    this.height = height ?? this.height
  }
}

class GameObject {
  position = DEFAULT_POSITION
  constructor({x, y}, sprite) {
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

  modifyVelocity(vel) {
    this.velocity.x += vel.x
    this.velocity.y += vel.y
  }
}

class Ball extends MovingObject {
  // ball stuff here idk
}

class Tile {
  position = DEFAULT_POSITION

  sprite = null

  constructor({x, y}) {
    this.position.x = x
    this.position.y = y
  }

  applySprite(sprite) {
    sprite.scale(TILE_DIMENSIONS)

    this.sprite = sprite
  }
}