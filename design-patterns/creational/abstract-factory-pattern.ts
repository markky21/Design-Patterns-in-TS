import { Door, Maze, Room, Wall } from "./maze-game";

class MazeFactory {
  makeMaze(): Maze {
    return new Maze();
  }

  makeWall(): Wall {
    return new Wall();
  }

  makeRoom(roomNumber: number): Room {
    return new Room(roomNumber);
  }

  makeDoor(room1: Room, room2: Room): Door {
    return new Door(room1, room2);
  }
}

// EnchantedMazeFactory

class EnchantedRoom extends Room {
  constructor(roomNumber: number, public spell: string = "fire") {
    super(roomNumber);
  }

  enter() {
    console.log(`You entered enchanted room ${this.roomNumber}`);
  }
}

class DoorNeedingSpell extends Door {
  enter() {
    console.log(
      `You entered a door between rooms ${this.roomFrom.roomNumber} and ${this.roomTo.roomNumber} and you need a spell to pass it`
    );
  }
}

class EnchantedMazeFactory extends MazeFactory {
  makeRoom(roomNumber: number): Room {
    return new EnchantedRoom(roomNumber, this.castSpell());
  }

  makeDoor(room1: Room, room2: Room): Door {
    return new DoorNeedingSpell(room1, room2);
  }

  private castSpell() {
    console.log("Spell casted");
    return "fire";
  }
}

// BombedMazeFactory

class BombedWall extends Wall {
  enter() {
    console.log("You hit a wall and it exploded");
  }
}

class RoomWithABomb extends Room {
  constructor(roomNumber: number, public bomb: boolean = true) {
    super(roomNumber);
  }

  enter() {
    console.log(`You entered room ${this.roomNumber} and it has a bomb`);
  }
}

class BombedMazeFactory extends MazeFactory {
  makeWall(): Wall {
    return new BombedWall();
  }

  makeRoom(roomNumber: number): Room {
    return new RoomWithABomb(roomNumber);
  }
}

//implementation of MazeFactory
class CreateMaze {
  constructor(private factory: MazeFactory) {}

  createMaze() {
    const maze = this.factory.makeMaze();

    const room1 = this.factory.makeRoom(1);
    const room2 = this.factory.makeRoom(2);

    const door = this.factory.makeDoor(room1, room2);

    maze.addRoom(room1);
    maze.addRoom(room2);

    return maze;
  }
}

/**
 * Usage
 */

const mazeFactory = new MazeFactory();
const createMaze = new CreateMaze(mazeFactory);
console.log(createMaze.createMaze());

const enchantedMazeFactory = new EnchantedMazeFactory();
const createMaze2 = new CreateMaze(enchantedMazeFactory);
console.log(createMaze2.createMaze());

const bombedMazeFactory = new BombedMazeFactory();
const createMaze3 = new CreateMaze(bombedMazeFactory);
console.log(createMaze3.createMaze());
