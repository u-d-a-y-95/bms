import dotenv from "dotenv";
dotenv.config();

import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";

import { mq } from "./mq";
import { rootRouter } from "./routes";
import { signup } from "./controllers/auth";
import { validate } from "./middlewares/validator";
import { signupSchema } from "./dtos/auth";
import { mainErrorHandler } from "./middlewares/error";

const app: Application = express();
mq.connect();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

app.use(cors());
app.use(express.json());

app.post("/signup", validate(signupSchema), signup);

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.headers["user"]) {
    req.user = JSON.parse(String(req.header("user")));
    next();
  } else {
    return res.status(400).end();
  }
});

app.use("/", rootRouter);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("ok");
});

app.use(mainErrorHandler);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`bms-org service is running on ${port}`);
});
