class Node():
    def __init__(self, name, parent=None):
        self.name = name
        self.depth = 0
        if parent:
            self.depth = parent.depth + 1

    def add_child(self, child):
        child.parent = self
        child.depth = self.depth + 1
        self.children.append(child)

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name

    def __eq__(self, other):
        return self.name == other.name