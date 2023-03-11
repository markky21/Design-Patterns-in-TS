import { Door, Maze, Room, Side, Wall } from "./maze-game";

class MazeGame {
  protected makeMaze(): Maze {
    return new Maze();
  }

  protected makeRoom(roomNumber: number): Room {
    return new Room(roomNumber);
  }

  protected makeDoor(room1: Room, room2: Room): Door {
    return new Door(room1, room2);
  }

  protected makeWall(): Wall {
    return new Wall();
  }

  createMaze(): Maze {
    const maze = this.makeMaze();

    const room1 = this.makeRoom(1);
    const room2 = this.makeRoom(2);
    const door = this.makeDoor(room1, room2);

    maze.addRoom(room1);
    maze.addRoom(room2);

    room1.setSide(Side.North, this.makeWall());
    room1.setSide(Side.East, door);
    room1.setSide(Side.South, this.makeWall());
    room1.setSide(Side.West, this.makeWall());

    room2.setSide(Side.North, this.makeWall());
    room2.setSide(Side.East, this.makeWall());
    room2.setSide(Side.South, this.makeWall());
    room2.setSide(Side.West, door);

    return maze;
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

class BombedMazeGame extends MazeGame {
  protected makeWall(): Wall {
    return new BombedWall();
  }

  protected makeRoom(roomNumber: number): Room {
    return new RoomWithABomb(roomNumber);
  }
}

/**
 * Usage
 */

const mazeGame = new MazeGame();
const maze = mazeGame.createMaze();
console.log(maze);

const bombedMazeGame = new BombedMazeGame();
const bombedMaze = bombedMazeGame.createMaze();
console.log(bombedMaze);
