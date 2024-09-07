import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { case2, case3, case4, case5, case6, case7, case8, case9 } from "./caseSwitch.js";

export function pathFile(file) {
	const filename = fileURLToPath(import.meta.url);
	const dirname = path.dirname(filename);
	return (path.join(dirname, file));
}

export function updateTable(tabela, jogos) {
	let newTabela = [];

	for(let i = 0; i < tabela.tabela.length; i++) {
		let atleta = { nome: tabela.tabela[i].nome, tj: 0, v: 0, d: 0, vSet: 0, pf: 0, ps: 0 };

		for(let j = 0; j < jogos.length; j++) {
			if (atleta.nome == jogos[j].nome1) {
				atleta.v += (jogos[j].v == 1) ? 1 : 0; // v -> total de vitorias
				atleta.d += (jogos[j].v == 2) ? 1 : 0; // d -> total de derrotas
				atleta.vSet += (jogos[j].v == 1) ? 2 : (jogos[j].sets == 3) ? 1 : 0; // vSet -> total de sets vencidos
				atleta.pf += jogos[j].set1_1 + jogos[j].set2_1 + jogos[j].set3_1; // pf -> pontos feitos
				atleta.ps += jogos[j].set1_2 + jogos[j].set2_2 + jogos[j].set3_2; // ps -> pontos sofridos
			} else if (atleta.nome == jogos[j].nome2) {
				atleta.v += (jogos[j].v == 2) ? 1 : 0; // v -> total de vitorias
				atleta.d += (jogos[j].v == 1) ? 1 : 0; // d -> total de derrotas
				atleta.vSet += (jogos[j].v == 2) ? 2 : (jogos[j].sets == 3) ? 1 : 0; // vSet -> total de sets vencidos
				atleta.pf += jogos[j].set1_2 + jogos[j].set2_2 + jogos[j].set3_2; // pf -> pontos feitos
				atleta.ps += jogos[j].set1_1 + jogos[j].set2_1 + jogos[j].set3_1; // ps -> pontos sofridos
			}
		}
		atleta.tj = atleta.v + atleta.d; // tj -> total de jogos disputados
		newTabela.push(atleta);
	}
	return newTabela;
}

export async function readJsonFile(jsonFilePath) {
	try {
		return JSON.parse(await fs.readFile(jsonFilePath, "utf8"));
	} catch (err) {
		throw new Error("Erro ao ler o arquivo JSON");
	}
};

export async function writeJsonFile(jsonFilePath, data) {
	try {
		await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2));
	} catch (err) {
		throw new Error("Erro ao escrever no arquivo JSON");
	}
};

export async function creatFolder(folder) {
	try {
		await fs.mkdir(folder, { recursive: true });
	} catch (erro) {
		throw new Error("Erro ao criar pasta");
	}
}

export async function listDirectory(path) {
	try {
		return (await fs.readdir(path));
	} catch (error) {
		throw new Error("Erro ao ler pasta");
	}
}

export async function checkFile(path) {
	try {
		await fs.access(path, fs.constants.F_OK);
		return (true);
	} catch (err) {
		return (false);
	}
}

export async function deleteFile(path) {
	try {
		await fs.unlink(path);
	} catch (error) {
		throw new Error("Erro ao ler pasta");
	}
}

export async function deleteFolder(folderPath) {
    try {
        const files = await fs.readdir(folderPath);

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const stats = await fs.lstat(filePath);
            if (stats.isDirectory()) {
                await deleteFolder(filePath);
            } else {
                await fs.unlink(filePath);
            }
        }
        await fs.rmdir(folderPath);
    } catch (error) {
		throw new Error("Erro ao deletar pasta");
    }
}

export function creatTabela(atletas) {
	let tabela = { tabela: [] };

	atletas.forEach((atleta, i) => tabela.tabela.push({ nome: atleta.nome, tj: 0, v: 0, d: 0, vSet: 0, pf: 0, ps: 0 }));
	return (tabela);
}

export function creatJogos(atletas) {
	switch (atletas.length) {
		case 2:
			return (case2(atletas));
		case 3:
			return (case3(atletas));
		case 4:
			return (case4(atletas));
		case 5:
			return (case5(atletas));
		case 6:
			return (case6(atletas));
		case 7:
			return (case7(atletas));
		case 8:
			return (case8(atletas));
		case 9:
			return (case9(atletas));
		default:
			console.log("Erro: numero de atletas nao esperado");
			return ("Erro");
	}
}