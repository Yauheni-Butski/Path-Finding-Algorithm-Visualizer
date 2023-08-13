/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-redeclare */
import { useEffect, useRef } from "react";
import { useState } from "react";
import "./Grid.css";
import { useParams } from "../../context/context";

export default function Grid() {
  const {
    grid,
    setgrid,
    editing,
    seteditFlag,
    mode,
    start,
    end,
    run,
    res,
    algo,
  } = useParams();

  /*
  Arguments:
  - the graph
  - the start and end point coordinates, start and target
  - prevmap, which is a hashmap used to track the previous cell for each cell in the grid when the algorithm runs
  - hashmap, which is a hashmap that we will use to track visited cells. A hashmap is an object with key value pairs, like a dictionary in Python.
  
  For each cell in the graph, we will create an id x-y which will be unique. We'll set its value to false for hashmap and null for prevmap.
  Now we will start with an array with one element – the starting node's coordinates – and a counter set initially to zero. While the length of the array is not zero, we will pop the last element off the array and increment the counter.
  Now using the coordinates of the element, we will access its ref and add the visited class with a transition delay proportional to the counter.
  Then we will access the siblings of the element from the grid and check if they are visited or not from the hashmap. If they are visited we will ignore them, but if they are not visited we will mark them as visited and add them to the top of the array. Then we'll mark their value in the prevmap to the current element.
  When popping elements off, if we come to an element with x and y coordinates equal to those of the target, we will return this object with the current counter.
  
  Finally, if there is no path from a to b – for example if a is surrounded by walls – we will return null. This will happen only when the array gets empty before returning a value.
  */
  function BFS(graph, hashmap, prevmap, start, target) {
    let queue = [start];
    let count = 0;
    hashmap[`${start.x}-${start.y}`] = true;

    while (queue.length > 0) {
      count += 1;
      let c = queue.pop();
      refarray[c.x + c.y * 50].current.style["transition-delay"] = `${
        count * 8
      }ms`;
      refarray[c.x + c.y * 50].current.classList.add("visited");

      if (c.x == target.x && c.y == target.y) return [c, count];
      if (
        c.x + 1 < 50 &&
        !hashmap[`${c.x + 1}-${c.y}`] &&
        !graph[c.y][c.x + 1].isWall
      ) {
        queue.unshift({ x: c.x + 1, y: c.y });
        prevmap[`${c.x + 1}-${c.y}`] = { ...c };
        hashmap[`${c.x + 1}-${c.y}`] = true;
      }
      if (
        c.x - 1 >= 0 &&
        !hashmap[`${c.x - 1}-${c.y}`] &&
        !graph[c.y][c.x - 1].isWall
      ) {
        queue.unshift({ x: c.x - 1, y: c.y });
        prevmap[`${c.x - 1}-${c.y}`] = { ...c };
        hashmap[`${c.x - 1}-${c.y}`] = true;
      }
      if (
        c.y + 1 < 25 &&
        !hashmap[`${c.x}-${c.y + 1}`] &&
        !graph[c.y + 1][c.x].isWall
      ) {
        queue.unshift({ x: c.x, y: c.y + 1 });
        prevmap[`${c.x}-${c.y + 1}`] = { ...c };
        hashmap[`${c.x}-${c.y + 1}`] = true;
      }
      if (
        c.y - 1 >= 0 &&
        !hashmap[`${c.x}-${c.y - 1}`] &&
        !graph[c.y - 1][c.x].isWall
      ) {
        queue.unshift({ x: c.x, y: c.y - 1 });
        prevmap[`${c.x}-${c.y - 1}`] = { ...c };
        hashmap[`${c.x}-${c.y - 1}`] = true;
      }
    }
    return null;
  }

  /*
  Depth-first search is very similar: with small changes in the order, we can remove and add elements to the array.
  */
  function BDS(graph, hashmap, prevmap, start, target) {
    let queue = [start];
    let count = 0;
    hashmap[`${start.x}-${start.y}`] = true;

    while (queue.length > 0) {
      count += 1;
      let c = queue[0];
      queue.shift();
      refarray[c.x + c.y * 50].current.style["transition-delay"] = `${
        count * 8
      }ms`;
      refarray[c.x + c.y * 50].current.classList.add("visited");
      if (c.x == target.x && c.y == target.y) return [c, count];

      if (
        c.y + 1 < 25 &&
        !hashmap[`${c.x}-${c.y + 1}`] &&
        !graph[c.y + 1][c.x].isWall
      ) {
        queue.unshift({ x: c.x, y: c.y + 1 });
        prevmap[`${c.x}-${c.y + 1}`] = { ...c };
        hashmap[`${c.x}-${c.y + 1}`] = true;
      }
      if (
        c.x - 1 >= 0 &&
        !hashmap[`${c.x - 1}-${c.y}`] &&
        !graph[c.y][c.x - 1].isWall
      ) {
        queue.unshift({ x: c.x - 1, y: c.y });
        prevmap[`${c.x - 1}-${c.y}`] = { ...c };
        hashmap[`${c.x - 1}-${c.y}`] = true;
      }
      if (
        c.y - 1 >= 0 &&
        !hashmap[`${c.x}-${c.y - 1}`] &&
        !graph[c.y - 1][c.x].isWall
      ) {
        queue.unshift({ x: c.x, y: c.y - 1 });
        prevmap[`${c.x}-${c.y - 1}`] = { ...c };
        hashmap[`${c.x}-${c.y - 1}`] = true;
      }
      if (
        c.x + 1 < 50 &&
        !hashmap[`${c.x + 1}-${c.y}`] &&
        !graph[c.y][c.x + 1].isWall
      ) {
        queue.unshift({ x: c.x + 1, y: c.y });
        prevmap[`${c.x + 1}-${c.y}`] = { ...c };
        hashmap[`${c.x + 1}-${c.y}`] = true;
      }
    }
    return null;
  }

  function getRefArray(grid) {
    let array = [];
    grid.forEach((elem) => {
      elem.forEach(() => {
        array.push(useRef());
      });
    });
    return array;
  }

  const refArray = getRefArray(grid);
  const [refarray] = useState(refArray);

  function changeCellOnMouseMove(xIndex, yIndex) {
    if (!editing) return;

    const current = grid[yIndex][xIndex];
    if (current.isStart || current.isTarget) return;

    switch (mode) {
      case "setstart":
        var newgrid = grid.map((elem) => {
          return elem.map((elem) => {
            if (!elem.isStart) return elem;
            return { ...elem, isStart: false };
          });
        });

        newgrid[yIndex][xIndex] = {
          ...newgrid[yIndex][xIndex],
          isStart: true,
          isTarget: false,
          weight: 1,
          isWall: false,
        };

        start.current = { x: xIndex, y: yIndex };
        setgrid(newgrid);
        break;

      case "settarget":
        var newgrid = grid.map((elem) => {
          return elem.map((elem) => {
            if (!elem.isTarget) return elem;
            return { ...elem, isTarget: false };
          });
        });

        newgrid[yIndex][xIndex] = {
          ...newgrid[yIndex][xIndex],
          isStart: false,
          isTarget: true,
          weight: 1,
          isWall: false,
        };

        end.current = { x: xIndex, y: yIndex };
        setgrid(newgrid);
        break;

      case "addbricks":
        var newgrid = grid.slice();
        newgrid[yIndex][xIndex] = {
          ...newgrid[yIndex][xIndex],
          weight: 1,
          isWall: true,
        };

        setgrid(newgrid);
        break;

      case "addweight":
        var newgrid = grid.slice();
        newgrid[yIndex][xIndex] = {
          ...newgrid[yIndex][xIndex],
          weight: 5,
          isWall: false,
        };

        setgrid(newgrid);
        break;
      default:
        return;
    }
  }

  useEffect(() => {
    if (algo == "BFS") {
      let hashmap = {};
      let prevmap = {};

      for (let j = 0; j < 25; j++) {
        for (let i = 0; i < 50; i++) {
          hashmap[`${i}-${j}`] = false;
          prevmap[`${i}-${j}`] = null;
        }
      }

      let result = BFS(grid, hashmap, prevmap, start.current, end.current);
      let path = [];

      if (result != null) {
        let current = result[0];

        while (prevmap[`${current.x}-${current.y}`] != null) {
          path.push(current);
          current = prevmap[`${current.x}-${current.y}`];
        }

        setTimeout(() => {
          path.reverse().forEach((elem, index) => {
            refarray[elem.x + elem.y * 50].current.style[
              "transition-delay"
            ] = `${index * 15}ms`;
            refarray[elem.x + elem.y * 50].current.classList.add("path");
          });
        }, result[1] * 9);
      }
    }

    if (algo == "BDS") {
      let hashmap = {};
      let prevmap = {};

      for (let j = 0; j < 25; j++) {
        for (let i = 0; i < 50; i++) {
          hashmap[`${i}-${j}`] = false;
          prevmap[`${i}-${j}`] = null;
        }
      }

      let result = BDS(grid, hashmap, prevmap, start.current, end.current);
      let path = [];

      if (result != null) {
        let current = result[0];

        while (prevmap[`${current.x}-${current.y}`] != null) {
          path.push(current);
          current = prevmap[`${current.x}-${current.y}`];
        }

        setTimeout(() => {
          path.reverse().forEach((elem, index) => {
            refarray[elem.x + elem.y * 50].current.style[
              "transition-delay"
            ] = `${index * 15}ms`;
            refarray[elem.x + elem.y * 50].current.classList.add("path");
          });
        }, result[1] * 9);
      }
    }
  }, [run]);

  useEffect(() => {
    refarray.forEach((elem) => {
      elem.current.style["transition-delay"] = "0ms";
    });
    refarray.forEach((elem) => {
      elem.current.classList.remove("visited");
      elem.current.classList.remove("path");
    });
  }, [res]);

  return (
    <div className="board">
      {refarray.map((elem, index) => {
        let classList = ["cell"];

        let yIndex = Math.floor(index / 50);
        let xIndex = index % 50;
        let cell = grid[yIndex][xIndex];

        if (cell.isWall) {
          classList.push("wall");
        }

        return (
          <div
            key={`${index}`}
            ref={elem}
            className={classList.join(" ")}
            onMouseDown={() => seteditFlag(true)}
            onMouseUp={() => seteditFlag(false)}
            onMouseMove={() => changeCellOnMouseMove(xIndex, yIndex)}
          >
            {cell.weight > 1 ? <i className="bi bi-virus"></i> : null}
            {cell.isStart ? <i className="bi bi-geo-alt"></i> : null}
            {cell.isTarget ? <i className="bi bi-geo"></i> : null}
          </div>
        );
      })}
    </div>
  );
}
