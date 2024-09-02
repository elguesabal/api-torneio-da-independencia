import { updateTable, readJsonFile, pathFile, writeJsonFile } from "../src/functionJson.js";

export default function updateJogos(app) {
	app.put("/adm/jogos/:categoria/:modalidade", async (req, res) => {
		try {
			const categoria = req.params.categoria;
			const modalidade = req.params.modalidade;
			const jogos = { jogos: req.body };
			const tabela = { tabela: updateTable(await readJsonFile(pathFile(`../dados/tabelas/${categoria}/${modalidade}.json`)), req.body) };
	
			await writeJsonFile(pathFile(`../dados/jogos/${categoria}/${modalidade}.json`), jogos);
			await writeJsonFile(pathFile(`../dados/tabelas/${categoria}/${modalidade}.json`), tabela);
			res.status(200).send("ok");
		} catch (error) {
			res.status(500).send("Erro ao gravar tabela.");
		}
	});
}