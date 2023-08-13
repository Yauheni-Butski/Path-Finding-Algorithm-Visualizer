/* eslint-disable no-redeclare */
/* eslint-disable react-hooks/rules-of-hooks */
import { /* useEffect,  */ useRef } from "react";
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
    /*     run,
    res,
    algo, */
  } = useParams();

  const [refarray] = useState(getrefarray(grid));

  function getrefarray(grid) {
    let array = [];
    grid.forEach((elem) => {
      elem.forEach(() => {
        array.push(useRef());
      });
    });
    return array;
  }

  function changeCellOnMouseMove(xIndex, yIndex) {
    if (!editing) return;

    const current = grid[yIndex][xIndex];
    if (current.isstart || current.istarget) return;

    switch (mode) {
      case "setstart":
        var newgrid = grid.map((elem) => {
          return elem.map((elem) => {
            if (!elem.isstart) return elem;
            return { ...elem, isstart: false };
          });
        });

        newgrid[yIndex][xIndex] = {
          ...newgrid[yIndex][xIndex],
          isstart: true,
          istarget: false,
          weight: 1,
          iswall: false,
        };

        start.current = { x: xIndex, y: yIndex };
        setgrid(newgrid);
        break;

      case "settarget":
        var newgrid = grid.map((elem) => {
          return elem.map((elem) => {
            if (!elem.istarget) return elem;
            return { ...elem, istarget: false };
          });
        });

        newgrid[yIndex][xIndex] = {
          ...newgrid[yIndex][xIndex],
          isstart: false,
          istarget: true,
          weight: 1,
          iswall: false,
        };

        end.current = { x: xIndex, y: yIndex };
        setgrid(newgrid);
        break;

      case "addbricks":
        var newgrid = grid.slice();
        newgrid[yIndex][xIndex] = {
          ...newgrid[yIndex][xIndex],
          weight: 1,
          iswall: true,
        };

        setgrid(newgrid);
        break;

      case "addweight":
        var newgrid = grid.slice();
        newgrid[yIndex][xIndex] = {
          ...newgrid[yIndex][xIndex],
          weight: 5,
          iswall: false,
        };

        setgrid(newgrid);
        break;
      default:
        return;
    }
  }

  return (
    <div className="board">
      {refarray.map((elem, index) => {
        let classList = ["cell"];

        let yIndex = Math.floor(index / 50);
        let xIndex = index % 50;
        let cell = grid[yIndex][xIndex];

        if (cell.iswall) {
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
            {cell.isstart ? <i className="bi bi-geo-alt"></i> : null}
            {cell.istarget ? <i className="bi bi-geo"></i> : null}
          </div>
        );
      })}
    </div>
  );
}
