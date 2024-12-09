const { readJsonFromFile, writeJsonToFile } = require("../utils/fileUtils");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const usersFilePath = "./data/users.json";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.getAllUsers = async (req, res) => {
  const users = await readJsonFromFile(usersFilePath);
  res.status(200).json(users);
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const users = await readJsonFromFile(usersFilePath);
  const user = users.find((user) => user.id === parseInt(id));

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send({ message: "Korisnik nije pronadjen !" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email i lozinka su obavezni." });
  }

  try {
    const users = await readJsonFromFile(usersFilePath);
    const user = users.find((user) => user.email === email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );
        res
          .status(200)
          .json({ message: "Uspešno prijavljivanje", token, userId: user.id, role:user.role });
      } else {
        res.status(401).json({ message: "Netačna šifra." });
      }
    } else {
      res.status(401).json({ message: "Korisnik nije pronađen." });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Greška servera." });
  }
};

exports.createUser = async (req, res) => {
  const {
    name,
    surname,
    email,
    phone,
    address,
    password,
    parentId,
    childrens,
    school,
    classroomId,
    role
  } = req.body;

  if (!name || !surname || !email || !phone || !address || !password || !role) {
    return res.status(400).json({ message: "Sva polja su obavezna." });
  }
  if(RegExp(/^[a-zA-Z]{2,}$/).test(name) === false) {
    return res.status(400).json({ message: "Ime nije validno." });
  }
  if(RegExp(/^[a-zA-Z]{2,}$/).test(surname) === false) {
    return res.status(400).json({ message: "Prezime nije validno." });
  }
  if(RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email) === false) {
    return res.status(400).json({ message: "Email nije validan." });
  }
  if(RegExp(/^[0-9]{10}$/).test(phone) === false) {
    return res.status(400).json({ message: "Broj telefona nije validan." });
  }
  let users = await readJsonFromFile(usersFilePath);

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Korisnik sa ovim email-om već postoji." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    name,
    surname,
    email,
    phone,
    address,
    role,
    school: school || null,
    parentId: parentId || null,
    childrens: childrens || null,
    classroomId: classroomId || null,
    password: hashedPassword,
  };

  users.push(newUser);
  await writeJsonToFile(usersFilePath, users);

  res.status(201).json(newUser);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const {phone, address } = req.body;
  if(
    !phone ||
    !address
  ) {
    return res.status(400).json({ message: "Sva polja su obavezna." });
  }
  if(RegExp(/^[0-9]{9,10}$/).test(phone) === false) {
    return res.status(400).json({ message: "Broj telefona nije validan." });
  }
  let users = await readJsonFromFile(usersFilePath);

  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      phone,
      address,
    };

    await writeJsonToFile(usersFilePath, users);
    res.status(200).json(users[userIndex]);
  } else {
    res.status(404).send("Korisnik nije pronađen.");
  }
};

exports.changePassword = async (req, res) => {
  const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Obavezno je uneti staru i novu lozinku." });
  }
  if(oldPassword === newPassword) {
    return res
      .status(400)
      .json({ message: "Staru i novu lozinku ne smeju biti iste." });
  }
  try {
    let users = await readJsonFromFile(usersFilePath);
    const userIndex = users.findIndex((user) => user.id === parseInt(id));

    if (userIndex === -1) {
      return res.status(404).json({ message: "Korisnik nije pronađen." });
    }

    const user = users[userIndex];
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isOldPasswordValid) {
      return res.status(400).json({ message: "Pogrešna stara lozinka." });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    users[userIndex].password = hashedNewPassword;

    await writeJsonToFile(usersFilePath, users);
    res.status(200).json({ message: "Lozinka uspešno promenjena." });
  } catch (error) {
    console.error("Greška pri promeni lozinke:", error);
    res
      .status(500)
      .json({ message: "Došlo je do greške prilikom promene lozinke." });
  }
};
