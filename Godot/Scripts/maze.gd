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
		for y in range(self.height):
			var coordinates = Vector2(x, y)
			self.rooms[coordinates] = Room.new()
			self.rooms[coordinates].location = coordinates
	search_for_neighbours()

func search_for_neighbours():
	for x in range(self.width):
		for y in range(self.height):
			if y > 0:
				self.rooms[Vector2(x, y)].add_neighbour(UP)
			if x < self.height - 1:
				self.rooms[Vector2(x, y)].add_neighbour(RIGHT)
			if y < self.height - 1:
				self.rooms[Vector2(x, y)].add_neighbour(DOWN)
			if x > 0:
				self.rooms[Vector2(x, y)].add_neighbour(LEFT)
	add_openings()

func add_openings():
	for x in range(self.width):
		for y in range(self.height):
			var currentRoom = self.rooms[Vector2(x, y)]
			if currentRoom.walls.size() == 0:
				continue
			randomize()
			var randomNeighbour = floor(rand_range(0, currentRoom.walls.size() - 1))
			currentRoom.add_opening(currentRoom.walls[randomNeighbour])
