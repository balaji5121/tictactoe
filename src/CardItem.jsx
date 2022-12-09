import { Card, Typography } from "@material-ui/core";

export default function CardItem(props) {
  const { info, fun } = props;
  const { isX, isO } = info;

  return (
    <Card
      style={{
        height: "20vh",
        width: "25vw",
        backgroundColor: isX && "red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={() => {
        fun({ info });
      }}
    >
      <Typography variant="h1" align="center">
        {" "}
        {isX && "X"}
        {isO && "O"}
      </Typography>
    </Card>
  );
}
