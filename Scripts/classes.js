class Sprite {
  position = DEFAULT_POSITION

  constructor(image, position) {
    this.image = image

    this.position.x = position.x ?? DEFAULT_POSITION.x
    this.position.y = position.y ?? DEFAULT_POSITION.y
  }

  rescale(scale) {
    this.image.width = scale.x
    this.image.height = scale.y
  }

  changeImage(image, keepScale) {
    if (keepScale) {
      image.width = this.image.width
      image.height = this.image.height
    }

    this.img = image
  }

  draw() {
    ctx.drawImage(this.img, this.position.x, this.position.y, this.scale.width, this.scale.height)
  }
}

class GameObject {
  position = DEFAULT_POSITION
  constructor(position, sprite) {
    this.position.x = position.x;
    this.position.y = position.y;
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