export enum Side {
  North = "North",
  South = "South",
  East = "East",
  West = "West",
}

export abstract class MapSite {
  enter() {}
}

export class Maze {
  rooms: Room[] = [];

  addRoom(room: Room) {
    this.rooms.push(room);
  }

  getRoom(roomNumber: number): Room {
    return this.rooms.find((room) => room.roomNumber === roomNumber);
  }
}

export class Room extends MapSite {
  private sides = new Map<Side, Wall | Door>([
    [Side.East, new Wall()],
    [Side.West, new Wall()],
    [Side.North, new Wall()],
    [Side.South, new Wall()],
  ]);

  constructor(public roomNumber: number) {
    super();
  }

  enter() {
    console.log(`You entered room ${this.roomNumber}`);
  }

  setSide(side: Side, mapSite: Wall | Door) {
    this.sides.set(side, mapSite);
  }
}

export class Wall extends MapSite {
  enter() {
    console.log("You hit a wall");
  }
}

export class Door extends MapSite {
  constructor(public roomFrom: Room, public roomTo: Room) {
    super();
  }

  enter() {
    console.log(
      `You entered a door between rooms ${this.roomFrom.roomNumber} and ${this.roomTo.roomNumber}`
    );
  }
}

class MazeGame {
  createMaze(): Maze {
    const maze = new Maze();

    const room1 = new Room(1);
    const room2 = new Room(2);

    const door = new Door(room1, room2);

    maze.addRoom(room1);
    maze.addRoom(room2);

    return maze;
  }
}

// console.log(new MazeGame().createMaze().getRoom(1).enter());
