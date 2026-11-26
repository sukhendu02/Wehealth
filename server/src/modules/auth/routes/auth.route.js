import express from "express";
import { userLogin } from "../controller/auth.controller.js";
import { Router } from "express";


const router = Router();

router.get("/login", userLogin)




export default router