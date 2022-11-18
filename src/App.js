import { Box, Button, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import CardItem from "./CardItem";
import "./styles.css";
const Logic = [
  { id: 1, isX: false, isO: false },
  { id: 2, isX: false, isO: false },
  { id: 3, isX: false, isO: false },
  { id: 4, isX: false, isO: false },
  { id: 5, isX: false, isO: false },
  { id: 6, isX: false, isO: false },
  { id: 7, isX: false, isO: false },
  { id: 8, isX: false, isO: false },
  { id: 9, isX: false, isO: false }
];

const indexes = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const gameStatusConstants = {
  startGame: "StartGame",
  xHasWon: "xHasWon",
  oHasWon: "oHasWon",
  gameTied: "gameTied"
};

export default function App() {
  const [count, setCount] = useState(0);
  const [gameStatus, setGameStatus] = useState(gameStatusConstants.startGame);
  const [logicArr, setLogicArr] = useState(Logic);
  const verifyWinner = () => {
    for (let c of indexes) {
      const [i, j, k] = c;

      if (logicArr[i].isX && logicArr[j].isX && logicArr[k].isX) {
        setGameStatus(gameStatusConstants.xHasWon);
        setCount(0);

        console.log("x");
      } else if (logicArr[i].isO && logicArr[j].isO && logicArr[k].isO) {
        setGameStatus(gameStatusConstants.oHasWon);
        setCount(0);
        console.log("o");
      }
    }
  };

  const verifyTie = () => {
    if (count === 10) {
      setGameStatus(gameStatusConstants.gameTied);
      setCount(0);
    }
  };

  useEffect(() => {
    verifyWinner();
    verifyTie();
  }, [logicArr]);

  const fun = ({ info }) => {
    if (!info.isX && !info.isO) {
      setCount((prev) => prev + 1);
    }

    const { id } = info;
    if (count % 2 === 0) {
      setLogicArr((prev) =>
        prev.map((each) => {
          if (each.id === id && !info.isO) {
            return { ...each, isX: true };
          }
          return { ...each };
        })
      );
    } else {
      setLogicArr((prev) =>
        prev.map((each) => {
          if (each.id === id && !info.isX) {
            return { ...each, isO: true };
          }
          return { ...each };
        })
      );
    }
  };
  const LoadingTheGame = () => {
    return (
      <Box>
        <Grid container spacing={1}>
          {logicArr.map((each) => (
            <Grid item xs={4} key={each.id}>
              <CardItem info={each} fun={fun} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  const restartTheGame = () => {
    setCount(0);
    setGameStatus(gameStatusConstants.startGame);
    setLogicArr(Logic);
  };
  const winnerX = () => (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Typography variant="h5">X has Won</Typography>
      <Button variant="contained" color="primary" onClick={restartTheGame}>
        Restart{" "}
      </Button>
    </Box>
  );
  const winnerO = () => (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Typography variant="h5">O has Won</Typography>
      <Button variant="contained" color="primary" onClick={restartTheGame}>
        Restart{" "}
      </Button>
    </Box>
  );
  const gameDraw = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography variant="h5">Game Tied</Typography>
      <Button variant="contained" color="primary" onClick={restartTheGame}>
        Restart{" "}
      </Button>
    </Box>
  );

  const renderGame = () => {
    switch (gameStatus) {
      case gameStatusConstants.startGame:
        return LoadingTheGame();
      case gameStatusConstants.xHasWon:
        return winnerX();
      case gameStatusConstants.oHasWon:
        return winnerO();
      case gameStatusConstants.gameTied:
        return gameDraw();
      default:
        return null;
    }
  };

  return (
    <Box
      style={{
        height: "100vh",
        padding: "30px",
        backgroundColor: "whitesmoke"
      }}
    >
      <Typography align="center" variant="h4" gutterBottom>
        Tic - Tac - Toe
      </Typography>
      {renderGame()}
    </Box>
  );
}
