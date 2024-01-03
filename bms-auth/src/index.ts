import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express, {
  Application,
  NextFunction,
  Request,
  Response,
  json,
} from "express";
import { customError } from "./middlewares/customError";
import { mq } from "./mq";
import { rootRouter } from "./routes/rootRoute";

const app: Application = express();
mq.connect();

app.use(cors());
app.use(json());
app.use("/", rootRouter);

app.get("/health", async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send("ok");
});

app.use(customError);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`auth server is running on ${PORT}`));
