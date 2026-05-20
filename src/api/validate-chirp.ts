import type { NextFunction, Request, Response } from "express";
import { PROFANE } from "../constants/profane";
import { BadRequestError } from "../utils/error-class";

type ParsedBody = {
  body: string;
};

export async function handlerValidateChirp(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsedBody: ParsedBody = req.body;

    if (parsedBody.body.length > 400) {
      // return res.status(400).json({ error: "Chirp is too long" });
      throw new BadRequestError("Chirp is too long. Max length is 140");
    }
    const cleanedBody = parsedBody.body
      .split(" ")
      .map((word) => {
        if (PROFANE.includes(word.toLowerCase())) {
          return "****";
        } else {
          return word;
        }
      })
      .join(" ");

    return res.json({ cleanedBody });
  } catch (err) {
    return next(err);
  }
}
