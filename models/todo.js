const { Schema, model } = require("mongoose");

const TodoSchema = Schema(
  {
    bodyTodo: {
      type: String,
      required: [true, "Texto del todo requerido"],
    },
    status: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ["WORK", "HOME", "SCHOOL"],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

TodoSchema.methods.toJSON = function () {
  const { __v, _id, ...todo } = this.toObject();
  todo.uid = _id;
  return todo;
};

module.exports = model("Todo", TodoSchema);
