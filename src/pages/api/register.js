import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const { password: passwordDB, ...user } = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      res.json({ user });
    } catch (error) {
      res.status(400).json({ message: "User already exists" });
    }
  } else {
    res.status(405).json({ error: "Method not Allowed" });
  }
};
