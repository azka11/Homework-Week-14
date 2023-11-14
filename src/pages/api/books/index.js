import { PrismaClient } from "@prisma/client";
import { authTokenMiddleware } from "../../../../public/utils/authTokenMiddleware";
import multer from "multer";
import path from "path";

const prisma = new PrismaClient();

const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../../../public/uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
});

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const books = await prisma.book.findMany();
      res.status(200).json({ books });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    upload.single("image")(req, res, async (uploadError) => {
      if (uploadError) {
        console.error(uploadError);
        res.status(500).json({ error: "Failed to upload image" });
      } else {
        const { title, author, publisher, year, pages } = req.body;
        try {
          const photo = req.file;
          // const photopath = photo.replace(/uploads\\/, "uploads/");
          const book = await prisma.book.create({
            data: {
              title,
              author,
              publisher,
              year: parseInt(year),
              pages: parseInt(pages),
              image: photo,
            },
          });
          res.status(200).json({ book });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
