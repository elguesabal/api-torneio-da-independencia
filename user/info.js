import { pathFile, getCategorias } from "../src/functionJson.js";

export default function getInfoHome(app) {
	app.get("/info/home", async (req, res) => {
		try {
			res.send(await getCategorias(pathFile(`../dados/${req.query.info}`)));
		} catch (error) {
			res.send("Erro ao buscar informacoes sobre as tabelas do torneio.");
		}
	});
}