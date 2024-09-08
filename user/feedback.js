import nodemailer from "nodemailer";

function enviarFeedback(email, feedback, res) {
	const transport = nodemailer.createTransport({
		host: 'smtp.office365.com',
		port: 587,
		secure: false,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.SENHA
		}
	});
	const dadosEmail = {
		from: `Torneio da independencia ${process.env.EMAIL}`,
		to: email,
		replyTo: feedback.feedback,
		subject: "Feedback recebido!",
		html: `<h1>Nome: ${feedback.nome}</h1><p>Feedback: ${feedback.feedback}</p>`,
		text: `Nome: ${feedback.nome} Feedback: ${feedback.feedback}`
	};
	transport.sendMail(dadosEmail)
	.then((response) => res.status(200).send("Email enviado"))
	.catch((error) => res.status(500).send("Falha ao enviar email"))
	// .then((response) => console.log("Email enviado"))
	// .catch((error) => console.log("Falha ao enviar email"))
}

export default function feedback(app) {
	app.post("/feedback", (req, res) => {
		const feedback = req.body;

		// enviarFeedback("joseelguesabal@gmail.com", feedback, res);
		// setTimeout(() => enviarFeedback("xxxx@gmail.com", feedback), 5000); // COLOCAR O EMAIL DO ALEXANDRE



		const transport = nodemailer.createTransport({
			host: 'smtp.office365.com',
			port: 587,
			secure: false,
			auth: {
				user: process.env.EMAIL,
				pass: process.env.SENHA
			}
		});
		const dadosEmail = {
			from: `Torneio da independencia ${process.env.EMAIL}`,
			to: email,
			replyTo: feedback.feedback,
			subject: "Feedback recebido!",
			html: `<h1>Nome: ${feedback.nome}</h1><p>Feedback: ${feedback.feedback}</p>`,
			text: `Nome: ${feedback.nome} Feedback: ${feedback.feedback}`
		};
		transport.sendMail(dadosEmail)
		.then((response) => res.status(200).send("Email enviado"))
		.catch((error) => res.status(500).send("Falha ao enviar email: " + error))
	});
}