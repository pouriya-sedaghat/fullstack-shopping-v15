import bcrypt from "bcryptjs";

const users = [
  {
    username: "P_Co_ST",
    email: "pouriyac12@gmail.com",
    password: bcrypt.hashSync("Pou7riy9@31"),
    isAdmin: true,
  },
  {
    username: "Zahra",
    email: "zahra@gmail.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: false,
  },
];

export default users;
