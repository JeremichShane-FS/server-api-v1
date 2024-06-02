import connectDB from "./app/db/config.js";
import app from "./app/index.js";

connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `Server Connected:  Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
