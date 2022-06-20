import mongoose from "mongoose";
import { Password } from "./../services/password";

// an interface that describes the propetries that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// an interface that describes the properties that user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// an interface that describe the property that user document has
interface UserDoc extends mongoose.Document, UserAttrs {
  createdAt: String;
  updatedAt: String;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await Password.toHash(this.get("password"));
    this.set("password", hashedPassword);
  }
  done();
});
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

const user = User.build({
  email: "sandip",
  password: "Snadip",
});

export { User };
