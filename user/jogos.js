import { readJsonFile, pathFile } from "../src/functionJson.js";

export default function getJogos(app) {
	app.get("/jogos", async (req, res) => {
		try {
			const categoria = req.query.categoria;
			const modalidade = req.query.modalidade;
			const data = await readJsonFile(pathFile(`../dados/jogos/${categoria}/${modalidade}.json`));
	
			res.json(data.jogos);
		} catch (error) {
			res.send("Erro ao encontrar tabela.");
		}
	});
}