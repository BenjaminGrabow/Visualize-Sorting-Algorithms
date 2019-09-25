import React from "react";
import styled from "styled-components";

const StyledAStar = styled.div`
  .box {
    border: 0.1rem solid black;
    width: 1rem;
    height: 1rem;
  }
`;

// Function to delete element from the array
function removeFromArray(arr, elt) {
  // Could use indexOf here instead to be more efficient
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

// An educated guess of how far it is between two points
function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  // var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

// An object to describe a spot in the grid
function Spot(i, j) {
  // Location
  this.i = i;
  this.j = j;

  // f, g, and h values for A*
  this.f = 0;
  this.g = 0;
  this.h = 0;

  // Neighbors
  this.neighbors = [];

  // Where did I come from?
  this.previous = undefined;

  // // Am I a wall?
  // this.wall = false;
  // if (random(1) < 0.4) {
  //   this.wall = true;
  // }

  // // Display me
  // this.show = function(col) {
  //   if (this.wall) {
  //     fill(0);
  //     noStroke();
  //     ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
  //   } else if (col){
  //     fill(col);
  //     rect(this.i * w, this.j * h, w, h);
  //   }
  // }

  // Figure out who my neighbors are
  this.addNeighbors = function(grid) {
    let i = this.i;
    let j = this.j;
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
    if (i > 0 && j > 0) {
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    if (i < cols - 1 && j > 0) {
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < rows - 1) {
      this.neighbors.push(grid[i - 1][j + 1]);
    }
    if (i < cols - 1 && j < rows - 1) {
      this.neighbors.push(grid[i + 1][j + 1]);
    }
  };
}

// columns and rows
let cols = 10;
let rows = 10;

// This will be the 2D array
let grid = new Array(cols);

// Open and closed set
let openSet = [];
let closedSet = [];

// Start and end
let start;
let end;

class AStar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: null
    };
  }

  componentDidMount = () => {
    // let grid = [];
    // let rows = 10;
    // let columns = 10;
    // let counter = 0;

    // const fill2DimensionsArray = (arr, rows, columns) => {
    //   for (let i = 0; i < rows; i++) {
    //     arr.push([counter]);
    //     for (let j = 0; j < columns; j++) {
    //       arr[i][j] = counter;
    //     counter += 1;
    //     }
    //   }
    // }

    // fill2DimensionsArray(grid, rows, columns);

    
    
    // Making a 2D array
    for (let i = 0; i < cols; i++) {
      grid[i] = new Array(rows);
    }
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
    
    // All the neighbors
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].addNeighbors(grid);
      }
    }
    
    // Start and end
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    start.wall = false;
    end.wall = false;
    
    // openSet starts with beginning only
    openSet.push(start);
    
    console.log(grid);
    this.setState({
      grid: grid
    });
  };

  start = () => {

    // Am I still searching?
    if (openSet.length > 0) {
  
      // Best next option
      var winner = 0;
      for (var i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[winner].f) {
          winner = i;
        }
      }
      var current = openSet[winner];
  
      // Did I finish?
      if (current === end) {
        break;
        console.log("DONE!");
      }
  
      // Best option moves from openSet to closedSet
      removeFromArray(openSet, current);
      closedSet.push(current);
  
      // Check all the neighbors
      var neighbors = current.neighbors;
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
  
        // Valid next spot?
        if (!closedSet.includes(neighbor) && !neighbor.wall) {
          var tempG = current.g + heuristic(neighbor, current);
  
          // Is this a better path than before?
          var newPath = false;
          if (openSet.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
              newPath = true;
            }
          } else {
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }
  
          // Yes, it's a better path
          if (newPath) {
            neighbor.h = heuristic(neighbor, end);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = current;
          }
        }
  
      }
    // Uh oh, no solution
    } else {
      console.log('no solution');
      noLoop();
      return;
    }
  
    // Draw current state of everything
    // background(255);
  
    // for (var i = 0; i < cols; i++) {
    //   for (var j = 0; j < rows; j++) {
    //     grid[i][j].show();
    //   }
    // }
  
    // for (var i = 0; i < closedSet.length; i++) {
    //   closedSet[i].show(color(255, 0, 0, 50));
    // }
  
    // for (var i = 0; i < openSet.length; i++) {
    //   openSet[i].show(color(0, 255, 0, 50));
    // }
  
  
    // // Find the path by working backwards
    // path = [];
    // var temp = current;
    // path.push(temp);
    // while (temp.previous) {
    //   path.push(temp.previous);
    //   temp = temp.previous;
    // }
  
  
    // for (var i = 0; i < path.length; i++) {
      // path[i].show(color(0, 0, 255));
    //}
  
    // Drawing path as continuous line
    // noFill();
    // stroke(255, 0, 200);
    // strokeWeight(w / 2);
    // beginShape();
    // for (var i = 0; i < path.length; i++) {
    //   vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
    // }
    // endShape();
  
  
  
  }
  
  render() {
    return (
      <StyledAStar>
        {this.state.grid ? (
          <table className="table-hover table-striped table-bordered">
            <tbody>
              {this.state.grid.map((item, i) => {
                let entry = item.map((element, j) => {
                  return (
                    <td className={`box ${element.i}${element.j}`} key={j}>
                      {/* {element} */}
                    </td>
                  );
                });
                return (
                  <tr onClick={(e) => console.log(e.target.className.slice(4,6))} className={`box ${entry.i}`} key={i}>
                    {entry}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
        <button onClick={this.start}>Start</button>
      </StyledAStar>
    );
  }
}

export default AStar;
