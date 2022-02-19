const { default: mongoose } = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.CNN_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
