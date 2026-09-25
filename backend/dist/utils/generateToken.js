import jwt from "jsonwebtoken";
const generateToken = (id, role) => {
    const token = jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: "10d",
    });
    return token;
};
export default generateToken;
//# sourceMappingURL=generateToken.js.map