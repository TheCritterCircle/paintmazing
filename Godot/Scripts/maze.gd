var Room = load("res://Scripts/room.gd")

const UP = [Vector2(0, -1), 1]
const RIGHT = [Vector2(1, 0), 2]
const DOWN = [Vector2(0, 1), 4]
const LEFT = [Vector2(-1, 0), 8]

var width
var height
var rooms = {}

func _init(width, height):
	self.width = width
	self.height = height
	create_rooms()

func create_rooms():
	for x in range(self.width):
		for y in range(self.width):
			var coordinates = Vector2(x, y)
			self.rooms[coordinates] = Room.new()
			self.rooms[coordinates].tile_id = 0
