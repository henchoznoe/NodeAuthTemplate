import { errorResponse, successResponse } from "../http/http-responses";
import { Request, Response } from "express";
import { authenticateUser, createUser } from "../wrk/auth";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const newUser = await createUser(email, password);
    return successResponse(res, 201, "User created successfully", newUser);
  } catch ( err ) {
    return errorResponse(res, err.statusCode || 500, err.message || "Server error");
  }
}

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    return successResponse(res, 200, "User authenticated successfully", user);
  } catch ( err ) {
    return errorResponse(res, err.statusCode || 500, err.message || "Server error");
  }
}