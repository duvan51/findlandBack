import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

import { sendEmail } from "../services/sendGrid.js";



let otps = {}; 


export const registerUser = async (req, res) => {
    console.log("datos recibidos", req.body);
  
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      identificacion,
      address,
      country,
      city,
      Dni,
      docLegal,
      rol,
      photeUrl,
      birthdate,
      otp,
      isVerified

    } = req.body;

    

    try {

      // Validación de campos requeridos
      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
      }
  
      // Verificar si el usuario ya existe
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "El correo ya fue registrado" });
      }
  
      // Crear y guardar el nuevo usuario
      const user = new User({
        firstName,
        lastName,
        email,
        phone,
        password, // Asume que tienes un middleware o función que hashea el password antes de guardarlo
        identificacion,
        address,
        country,
        city,
        Dni,
        docLegal,
        rol,
        photeUrl,
        birthdate,
        isVerified: false,
      });
  
      await user.save();
  

      // Genero token
      const token = generateToken(user._id);

      //Establezco el token como cookie
      res.cookie("cookieToken", token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: "strict",
      });



      // Generar OTP y enviarlo
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otps[email] = { code: otp };  // Guardar OTP sin expiración

    // Enviar el OTP al correo
    const otpSent = await sendEmail(email, "Verificación de tu cuenta", `Tu código OTP es: ${otp}`);

    if (!otpSent) {
      return res.status(500).json({ message: 'Error al enviar OTP' });
    }


  
  // Devolver el mensaje con el estado de registro
      return res.status(201).json({
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.rol,
        token: token,
      });
      
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      res.status(500).json({ message: "Error al registrar usuario" });
    }
  };



  // Autenticación (Login)
export const authUser = async (req, res) => {
    console.log("res => ",req.body)
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      // Verificar si el usuario ya existe
      const userExists = await User.findOne({ email });
      if (!userExists) {
        return res.status(400).json({ message: "El correo no ha sido registrado" });
      }

      if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);
  
        
        res.cookie("cookieToken", token, {
          maxAge: 3600000, // 1 hora
          httpOnly: true,
          sameSite: "strict",
        });
        
        
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.rol,
          token: token,
        });
  
        
      } else {
        res.status(401).json({ message: "Credenciales inválidas" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al autenticar usuario" });
    }
  };


  // Genero JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };
//


// generate otp 
export const verifyOtp = async (req, res)=>{
  const {email, otp} = req.body;

  try {
    // Verificar si el OTP existe y es válido
    const otpData = otps[email];
    if (!otpData || otpData.code !== otp || Date.now() > otpData.expiresAt) {
      return res.status(400).json({ message: 'OTP inválido o expirado' });
    }

    // Eliminar OTP después de su validación exitosa
    delete otps[email];

    // Marcar la cuenta como verificada
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    user.isVerified = true; // Marcar el usuario como verificado
    await user.save();

    return res.status(200).json({ message: 'Cuenta verificada exitosamente' });
    
  } catch (error) {
    console.error('Error al verificar el OTP:', error);
    res.status(500).json({ message: 'Error al verificar el OTP' });
  }
}




   // Método para obtener todos usuarios esto es prueba
 export const getAlluser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo productos de comida: ' + error.message });
    }
  }



  export const getUserByid = async (req, res)=>{
    const {id}= req.params;
    try {
      const user = await User.findById(id);
      if(!user){
        return res.status(404).json({message: "usuario no encontrado"})
      }
      res.status(200).json(user)
    } catch (error) {
      console.error("error al obtener usuario", error);
      res.status(500).json({message: 'Error al obtener el usuario'})      
    }
  }



  export const deleteUserById = async (req, res)=>{
    const {id} = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      if(!user){
        return res.status(404).json({message: "usuario no encontrado"})
      }
      res.status(200).json({message: "usuario eliminado exitosamente", user})
    } catch (error) {
      console.error("Error al eliminar el usuario", error)
      res.status(400).json({message: "usuario eliminado exitosamente"})
    }
  }