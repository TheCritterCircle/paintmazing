var openings = 0
var neighbours = []
var walls = []

var location = Vector2()

func add_opening(d):
	openings =+ d[1]
	walls.remove(walls.find(d))

func add_neighbour(d):
	neighbours.push_back(d)
	walls.push_back(d)
