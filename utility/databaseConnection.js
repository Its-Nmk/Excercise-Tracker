const mongoose = require("mongoose");

try {
  mongoose.connect(
    `${process.env.ATLAS_URL}/exercise-tracker`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("connected to Database");
    }
  );
} catch (e) {
  console.error(e);
}
