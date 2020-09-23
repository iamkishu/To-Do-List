let lotion = require("lotion");
let express = require("express");
let server = express();
let port = 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

let GCI = "";

let app = lotion({
  initialState: {
    tasks: [],
  },
});

function transactionHandler(state, tx) {
  if (tx.type === "Add Task") {
    let task = {};
    task.id = state.tasks.length + 1;
    task.task = tx.task;
    task.completed = "No";
    state.tasks.push(task);
  }

  if (tx.type === "Complete Task") {
    for (let i = 0; i < state.tasks.length; i++) {
      if (state.tasks[i].id === tx.id) {
        state.tasks[i].completed = "Yes";
      }
    }
  }
}

app.use(transactionHandler);

app.start().then(async (appInfo) => {
  GCI = appInfo.GCI;
});

server.get("/showTasks", async function (req, res) {
  let { state, send } = await lotion.connect(GCI);
  let response = await state;
  res.send(response);
});

server.post("/addTask", async function (req, res) {
  if (
    req.body.type != "" &&
    req.body.type != undefined &&
    req.body.type != " " &&
    req.body.type === "Add Task" &&
    req.body.task != "" &&
    req.body.task != undefined &&
    req.body.task != " "
  ) {
    let { state, send } = await lotion.connect(GCI);
    let response = await send({ type: req.body.type, task: req.body.task });
    res.status(200).send({ response });
  } else {
    res.status(405).send({ error: "Missing parameters" });
  }
});

server.post("/completeTask", async function (req, res) {
  if (
    req.body.type != "" &&
    req.body.type != undefined &&
    req.body.type != " " &&
    req.body.type === "Complete Task" &&
    req.body.id != "" &&
    req.body.id != undefined &&
    req.body.id != " "
  ) {
    let { state, send } = await lotion.connect(GCI);
    let response = await send({ type: req.body.type, id: req.body.id });
    res.status(200).send(response);
  } else {
    res.status(405).send({ error: "Missing parameters" });
  }
});

server.listen(port, () => {
  console.log("Blockchain server running on " + String(port));
});
