extends Node2D

var Maze = load("res://Scripts/maze.gd")

func _ready():
	var maze = Maze.new(5, 5)
