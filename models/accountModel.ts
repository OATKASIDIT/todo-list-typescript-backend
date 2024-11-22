import { Request, Response } from "express";
import sequelize from "../config/config";
import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

type AccountAttributes = {
	id: number;
	username: string;
	password: string;
}

type AccountCreationAttributes = Optional<AccountAttributes, 'id'>;

class Account extends Model<AccountAttributes, AccountCreationAttributes> {
	declare id: number;
	declare username: string;
	declare password: string;
  }

// Models
Account.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	}, {sequelize}
);

const signInAccount = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	const trimmedFields = [username?.trim(), password?.trim()];

	if(trimmedFields.some((field) => !field)){
		return res.status(400).json({ error: "All fields are required and must not be empty." });
	}

	try {
		const existingAccount = await Account.findOne({ where: { username } });
		if(!existingAccount){
			return res.status(401).json({ error: "Invalid username or password." });
		}

		const isMatch = await bcrypt.compare(password, existingAccount.password);
		if (!isMatch) {
            return res.status(401).json({ error: "Invalid username or password." });
        }

		const token = jwt.sign(
            { id: existingAccount.id, username: existingAccount.username },
            process.env.JWT_SECRET as string,
            { expiresIn: process.env.JWT_EXPIRES_IN as string }
        );

		return res.status(200).json({ message: "SignIn successfully.", token });
	} catch (error) {
		return res.status(500).json({ error: "Something went wrong during SignIn." });
	}
}

const createAccount = async (req: Request, res: Response) => {
	const { username, password, confirmPassword } = req.body;
	const trimmedFields = [username?.trim(), password?.trim(), confirmPassword?.trim()];
	
	if(trimmedFields.some((field) => !field)){
		return res.status(400).json({ error: "All fields are required and must not be empty." });
	}

	if(password !== confirmPassword){
		return res.status(400).json({ error: "Password and confirmPassword do not match." });
	}

	const t = await sequelize.transaction();
	try {
		const existingAccount = await Account.findOne({ where: { username } });
		if(existingAccount){
			return res.status(400).json({ error: "Username is already taken." });
		}

		const saltRounds = 10;
		const myPlaintextPassword = password.trim();
		const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);

		await Account.create({username: username.trim(), password: hashedPassword}, { transaction: t });
		await t.commit();

		return res.status(201).json({ message: "Account created successfully." });
	} catch (error) {
		await t.rollback();
		return res.status(500).json(error);
	}
};

export { signInAccount, createAccount };