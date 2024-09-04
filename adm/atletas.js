import { pathFile, creatFolder, writeJsonFile, creatJogos } from "../src/functionJson.js";

export default function updateAtletas(app) {
	app.put("/adm/atletas/:categoria/:modalidade", async (req, res) => {
		try {
			const categoria = req.params.categoria;
			const modalidade = req.params.modalidade;
			const atletas = { tabela: req.body };

			await creatFolder(pathFile(`../dados/tabelas/${categoria}`));
			await writeJsonFile(pathFile(`../dados/tabelas/${categoria}/${modalidade}.json`), atletas);
			await creatFolder(pathFile(`../dados/jogos/${categoria}`));
			await writeJsonFile(pathFile(`../dados/jogos/${categoria}/${modalidade}.json`), creatJogos(atletas.tabela));
			res.status(200).send("ok");
		} catch (error) {
			res.status(500).send("Erro ao inscrever atletas.");
		}
	});
}