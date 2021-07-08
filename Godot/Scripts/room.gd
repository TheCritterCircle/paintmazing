var openings = []
var connections = []

var location = Vector2()
var tile_id = 0

func add_opening(d):
	openings.push_back(d)

func add_connection(d):
	connections.push_back(d)

func is_open(d):
	return openings.has(d)
