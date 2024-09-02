import { readJsonFile, pathFile } from "../src/functionJson.js";

export default function getTabela(app) {
	app.get("/tabela", async (req, res) => {
		try {
			const categoria = req.query.categoria;
			const modalidade = req.query.modalidade;
			const data = await readJsonFile(pathFile(`../dados/tabelas/${categoria}/${modalidade}.json`));

			res.json(data.tabela);
		} catch (error) {
			res.send("Erro ao encontrar tabela.");
		}
	});
}