import { pathFile, listDirectory, creatFolder, deleteFolder, checkFile, writeJsonFile, deleteFile } from "../src/functionJson.js";

export function getCategoria(app) {
	app.get("/adm/categoria", async (req, res) => {
		try {
			const categoria = req.query.categoria;
			let categorias = await listDirectory(pathFile(`../dados/tabelas/${categoria}`));

			categorias.forEach((categoria, i) => categorias[i] = categoria.substring(0, categoria.length - 5));
			res.status(200).send(categorias);
		} catch (error) {
			res.status(500).send("Erro ao buscar informacoes sobre a categoria do torneio.");
		}
	});
}

export function creatCategoria(app) {
	app.post("/adm/categoria", async (req, res) => {
		try {
			const categorias = req.body;

			for (let i = 0; i < categorias.length; i++) {
				await creatFolder(pathFile(`../dados/tabelas/${categorias[i]}`));
				await creatFolder(pathFile(`../dados/jogos/${categorias[i]}`));
			}
			res.status(200).send("ok");
		} catch (error) {
			res.status(500).send("Erro ao criar a categoria do torneio.");
		}
	});
}

export function deleteCategoria(app) {
	app.delete("/adm/categoria/:categoria", async (req, res) => {
		try {
			const categoria = req.params.categoria;

			await deleteFolder(pathFile(`../dados/tabelas/${categoria}`));
			await deleteFolder(pathFile(`../dados/jogos/${categoria}`));
			res.status(200).send("ok");
		} catch (error) {
			res.status(500).send("Erro ao deletar a categoria do torneio.");
		}
	});
}

export function updateCategoria(app) {
	app.put("/adm/categoria/:categoria", async (req, res) => {
		try {
			const categoria = req.params.categoria;
			const modalidades = req.body;

			for (let i = 0; i < modalidades.length; i++) {
				if (!await checkFile(pathFile(`../dados/tabelas/${categoria}/${modalidades[i]}.json`))) {
					await writeJsonFile(pathFile(`../dados/tabelas/${categoria}/${modalidades[i]}.json`), { tabela: [] });
					await writeJsonFile(pathFile(`../dados/jogos/${categoria}/${modalidades[i]}.json`), { jogos: [] });
				}
			}
			const files = await listDirectory(pathFile(`../dados/tabelas/${categoria}`));
			files.forEach((file, i) => files[i] = file.substring(0, file.length - 5));
			const deletados = files.filter(item => !modalidades.includes(item));
			for (let i = 0; i < deletados.length; i++) {
				await deleteFile(pathFile(`../dados/tabelas/${categoria}/${deletados[i]}.json`));
				await deleteFile(pathFile(`../dados/jogos/${categoria}/${deletados[i]}.json`));
			}
			res.status(200).send("ok");
		} catch (error) {
			res.status(500).send("Erro ao atualizar informacoes sobre a categoria do torneio.");
		}
	});
}