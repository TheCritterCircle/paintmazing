extends Node2D

var Maze = load("res://Scripts/maze.gd")

func _ready():
	var maze = Maze.new(5, 5)
	render_tiles(maze)

func render_tiles(maze):
	var tileset = $TileMap.get_tileset()
	
	for y in range(maze.height):
		for x in range(maze.width):
			var tile = maze.rooms[Vector2(x, y)].tile_id
			$TileMap.set_cell(x, y, tile)
