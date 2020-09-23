// app.js
let lotion = require("lotion");

let app = lotion({
  initialState: {
    count: 0,
  },
});

app.use(function (state, tx) {
  if (state.count === tx.nonce) {
    console.log(state.count);
    state.count++;
  }
});

app.start().then(async function (appInfo) {
  console.log(`app started. gci: ${appInfo.GCI}`);
  let { state, send } = await lotion.connect(appInfo.GCI);

  console.log(await state);
  console.log(await send({ nonce: 0 }));
});
