import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, allowNull: false},
    lastName: { type: String, allowNull: false},
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    identificacion: { type: String },
    address: { type: String }, 
    country: { type: String },
    city: { type: String  },
    Dni: { type: String },
    docLegal: { type: String },
    photeUrl: { type: String },
    birthdate: { type: Date } ,
    rol: {
      type: String,
      enum: ["inversor", "solicitanteCredito", "admin"],
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,  // La cuenta no está verificada por defecto
    },

  },
  { timestamps: true }
);

// Método para encriptar contraseña
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Método para hashear contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next(); // Asegúrate de llamar a next() después de hashear
});

const User = mongoose.model("User", userSchema);
export default User;
