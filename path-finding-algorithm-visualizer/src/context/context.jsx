/* eslint-disable react/prop-types */
import { useContext, useState, createContext, useEffect, useRef } from "react";
import { getGrid } from "../utils/startingGrid";

const context = createContext();

export const useParams = () => {
  return useContext(context);
};

export const ParamsProvider = ({ children }) => {
  const [mode, setmode] = useState(null); //either building walls or setting the starting cell.
  const [algo, setalgo] = useState(""); //The algorithm that we will run.
  const [run, setrun] = useState(false); //Determining that we want to run the algorithm and clear the grid
  const [grid, setgrid] = useState(getGrid(50, 25)); //he grid which we will equal by default to the grid returned by the function we already created.
  const [editing, seteditFlag] = useState(false); //Determining if we're editing or not.
  const [res, setres] = useState(false);
  const start = useRef({ x: 25, y: 12 }); //For the starting node coordinates.
  const end = useRef({ x: 48, y: 23 }); //For the target node coordinates.

  useEffect(() => {
    restart();
  }, [res]);

  function restart() {
    setgrid(getGrid(50, 25));
  }

  return (
    <div>
      <context.Provider
        value={{
          mode,
          setmode,
          algo,
          setalgo,
          grid,
          setgrid,
          setres,
          editing,
          seteditFlag,
          start,
          end,
          run,
          setrun,
          res,
        }}
      >
        {children}
      </context.Provider>
    </div>
  );
};
