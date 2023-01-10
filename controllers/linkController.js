const Link = require("../models/Links");

const redirect = async (req, res, next) => {
	
	const title = req.params.title;

	try{
		let doc = await Link.findOneAndUpdate({title}, { $inc: {clicks: 1 }});
		if(doc) {
			res.redirect(doc.url);
		} else {
			next();
		}
	} catch (error) {
		res.send(error);
	}
};

const addLink = async (req, res) => {

	const link = new Link(req.body);

	try {
		await link.save();
		res.redirect("/");
	} catch(error) {
		res.render("add", { error, body: req.body });
	}
};

const allLinks = async(req, res) => {

	try {
		const links = await Link.find();
		res.render("all", { links });
	} catch(error) {
		res.send("add", { error, body: req.body });
	}
};

const deleteLink = async(req, res) => {

	let id = req.params.id;
	if(!id){
		id = req.body.id;
	}

	try {
		await Link.findByIdAndDelete(id);
		res.redirect("/");

	} catch(error) {
		res.status(404).send(error);
	}
};

const loadLink = async(req, res) => {

	let id = req.params.id;
	try {
		const links = await Link.findById(id);
		res.render("edit", { error:false, body:links });

	} catch(error) {
		res.status(404).send(error);
	}

};

const editLink = async (req, res) => {

	let link = {};

	link.title = req.body.title;
	link.description = req.body.description;
	link.url = req.body.url;

	let id = req.params.id;
	if(!id){
		id = req.body.id;
	}

	try {
		await Link.findByIdAndUpdate(id, link);
		res.redirect("/");
	} catch(error) {
		res.render("edit", { error, body: req.body });
	}
};



module.exports = {
	redirect,
	addLink,
	allLinks,
	deleteLink,
	loadLink,
	editLink
};