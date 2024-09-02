import { pathFile, creatFolder, writeJsonFile } from "../src/functionJson.js";
// import { promises as fs } from 'fs';


export default function updateAtletas(app) {
	app.put("/adm/atletas/:categoria/:modalidade", async (req, res) => {
		try {
			const categoria = req.params.categoria;
			const modalidade = req.params.modalidade;
			const atletas = { tabela: req.body };

			await creatFolder(pathFile(`../dados/tabelas/${categoria}`));
			await writeJsonFile(pathFile(`../dados/tabelas/${categoria}/${modalidade}.json`), atletas);
			// creatJogos(); // TEM Q CRIAR UMA FUNCAO Q CRIE OS JOGOS COM BASE NO NUMERO DE ATLETAS
			res.status(200).send("ok");
		} catch (error) {
			res.status(500).send("Erro ao inscrever atletas.");
		}
	});
}