import express, { NextFunction, Request, Response } from "express";
import { basicAuth, loginCheck } from "../service/auth/basicAuth";
const authRoutes = express.Router();

authRoutes.post("/login", loginCheck);

export default authRoutes;
