import { IUser, User } from "../../models/user";

declare global {
  namespace Express {
    interface Request {
      uid: string;
    }
  }
}
