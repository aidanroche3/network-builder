import app from "./app.js";

const HOSTNAME = "0.0.0.0";
const PORT = 3000;

app.listen(PORT, HOSTNAME, () => {
  console.log("SERVER RUNNING AT http://" + HOSTNAME + ":" + PORT + "/");
});
