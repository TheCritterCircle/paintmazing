extends Node2D

var Maze = load("res://Scripts/maze.gd")

func _ready():
	var maze = Maze.new(5, 5)
	render_tiles(maze)

func _process(_delta):
	if Input.is_action_just_pressed("ui_accept"):
		_ready()

func render_tiles(maze):
	var tileset = $TileMap.get_tileset()
	
	for x in range(maze.height):
		for y in range(maze.width):
			var tile = maze.rooms[Vector2(x, y)].tile_id
			$TileMap.set_cell(x, y, tile)