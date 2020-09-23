let lotion = require("lotion");

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
  console.log(appInfo.GCI);

  let { state, send } = await lotion.connect(appInfo.GCI);

  console.log(await state);

  console.log(await send({ task: "Take bath", type: "Add Task" }));
  console.log(await send({ task: "Attend a meeting", type: "Add Task" }));

  console.log(await send({ id: 2, type: "Complete Task" }));

  console.log(await state);
});
