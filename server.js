const http = require("http");
const app = require("./app");
const port = process.env.PORT || 4000;
const server = http.createServer(app);
const colors = require("colors");

console.log(
  colors.italic(
    colors.bgRed(
      colors.white(
        " =============LOGISTICS.PK BACKEND================\n",
        "|                                               |\n",
        "|             Programmed BY n0S                 |\n",
        "|                                               |\n",
        "|       Node.js   Oracle DB   Express.js        |\n",
        "|                                               |\n",
        "|             @2021 n0Swarez.tor                |\n",
        "================================================="
      )
    )
  )
);

server.listen(port);
