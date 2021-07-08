var Room = load("res://Scripts/room.gd")

const UP = Vector2(0, -1)
const DOWN = Vector2(0, 1)
const LEFT = Vector2(-1, 0)
const RIGHT = Vector2(1, 0)

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
	print(rooms)
