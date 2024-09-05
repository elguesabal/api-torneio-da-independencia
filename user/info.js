import { pathFile, listDirectory } from "../src/functionJson.js";

export default function getInfoHome(app) {
	app.get("/home", async (req, res) => {
		try {
			const tabelas = await listDirectory(pathFile("../dados/tabelas"));
			let home = [];

			for (let i = 0; i < tabelas.length; i++) {
				home.push({ categoria: tabelas[i], modalidades: await listDirectory(pathFile(`../dados/tabelas/${tabelas[i]}`)) });
				for (let j = 0; j < home[i].modalidades.length ; j++) {
					home[i].modalidades[j] = home[i].modalidades[j].substring(0, home[i].modalidades[j].length - 5);
				}
			}
			res.status(200).send(home);
		} catch (error) {
			res.status(500).send("Erro ao buscar informacoes sobre as tabelas do torneio.");
		}
	});
}