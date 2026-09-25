import jwt from "jsonwebtoken";

const generateToken = (id: string, role: string): string => {
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: "10d",
  });

  return token;
};

export default generateToken;
