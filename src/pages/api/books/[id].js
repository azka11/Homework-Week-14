import { PrismaClient } from "@prisma/client";
import { authTokenMiddleware } from "../../../../public/utils/authTokenMiddleware";
const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method === "PUT") {
    authTokenMiddleware(req, res, async () => {
      const { id } = req.query;
      const { title, author, publisher, year, pages } = req.body;
      try {
        const book = await prisma.book.update({
          where: { id: Number(id) },
          data: {
            title,
            author,
            publisher,
            year: parseInt(year),
            pages: parseInt(pages),
          },
        });
        res.status(200).json({ book });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } else if (req.method === "DELETE") {
    authTokenMiddleware(req, res, async () => {
      const { id } = req.query;
      try {
        const book = await prisma.book.delete({
          where: { id: Number(id) },
        });
        res.json({ message: "Delete Success", data: book });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } else if (req.method === "GET") {
    try {
      const { id } = req.query;
      const book = await prisma.book.findUnique({
        where: { id: Number(id) },
      });

      if (book) {
        res.status(200).json({ book });
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
