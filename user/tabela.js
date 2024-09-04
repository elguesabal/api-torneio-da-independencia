import { readJsonFile, pathFile } from "../src/functionJson.js";

export default function getTabela(app) {
	app.get("/tabela", async (req, res) => {
		try {
			const categoria = req.query.categoria;
			const modalidade = req.query.modalidade;
			const data = await readJsonFile(pathFile(`../dados/tabelas/${categoria}/${modalidade}.json`));
			res.status(200).json(data.tabela);
		} catch (error) {
			res.status(500).send("Erro ao encontrar tabela.");
		}
	});
}