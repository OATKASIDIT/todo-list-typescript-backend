import { Request, Response } from "express";
import sequelize from "../config/config";
import { DataTypes } from "sequelize";

// Models
const Content = sequelize.define("content", {
	data: {
		type: DataTypes.STRING,
		allowNull: false,
	},
}, {});

const getContent = async (req: Request, res: Response) => {
	try {
		const content = await Content.findAll();
		return res.status(200).json(content);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const postContent = async (req: Request, res: Response) => {
	const contentData = req.body;
	const t = await sequelize.transaction();
	try {
		await Content.create(contentData, { transaction: t });
		const content = await Content.findAll({ transaction: t });
		await t.commit();
		return res.status(201).json(content);
	} catch (error) {
		await t.rollback();
		return res.status(500).json(error);
	}
};

const putContent = async (req: Request, res: Response) => {
	const { id, data } = req.body;
	if(!id || !data){
		return res.status(400).json({ error: "ID and data are required."});
	}
	const t = await sequelize.transaction();
	try {
		await Content.update({ data: data} ,{
			where: {
				id: id,
			},
			transaction: t
		});
		const content = await Content.findAll({ transaction: t });
		await t.commit();
		return res.status(200).json(content);
	} catch (error) {
		await t.rollback();
		return res.status(500).json(error);
	}
};

const deleteContent = async (req: Request, res: Response) => {
	const { id } = req.body;
	if(!id){
		return res.status(400).json({ error: "ID is required."});
	}
	const t = await sequelize.transaction();
	try {
		await Content.destroy({
			where: {
				id: id,
			},
			transaction: t
		});
		const content = await Content.findAll({ transaction: t });
		await t.commit();
		return res.status(200).json(content);
	} catch (error) {
		await t.rollback();
		return res.status(500).json(error);
	}
};

const deleteAllContent = async (req: Request, res: Response) => {
	const t = await sequelize.transaction();
	try {
		await Content.destroy({
			where: {},
			transaction: t }
		);
		const content = await Content.findAll({ transaction: t });
		await t.commit();
		return res.status(200).json(content);
	} catch (error) {
		await t.rollback();
		return res.status(500).json(error);
	}
};

export { getContent, postContent, putContent, deleteContent, deleteAllContent };