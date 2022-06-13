import express, { NextFunction, Request, Response } from "express";
import router from "./routers/odata";
import create = require('http-errors');
import { basicAuth } from "./service/auth/basicAuth";
import pageRoutes from "./routers/pages";
import authRoutes from "./routers/authRoutes";
import utilityRoutes from "./routers/utility";

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const axios = require('axios');
require('dotenv').config()
const PORT = process.env.PORT;

// app.get("/", basicAuth, (req: Request, res: Response, next: NextFunction) => {
//   res.send(`"hello world "  - Node Typescript`)
// });


app.use('/odata', router);
app.use('/auth', authRoutes)
app.use('/utils', utilityRoutes)
app.use('/', pageRoutes);

app.use(async (req: Request, res: Response, next: NextFunction) => {
  if (!req) {
    next(create('Please login to view this page.', 401));
    return;
  }
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = create(404);
  
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`running on port: ${PORT}`)
})