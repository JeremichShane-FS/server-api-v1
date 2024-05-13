const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is up.  Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
