import express from "express";
import cors from "cors";

// USER
import getInfoHome from "./user/info.js";
import getTabela from "./user/tabela.js";
import getJogos from "./user/jogos.js";
// USER

// ADM
import updateJogos from "./adm/jogos.js";
import updateAtletas from "./adm/atletas.js";
// ADM


// import { promises as fs } from 'fs';
// import path from "path";


const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());



// app.get("/teste", async (req, res) => {
// 	let files;

// 	try {
// 		files = await fs.readdir("./dados");

//         for (const file of files) {
//             const filePath = path.join("./dados", file);
//             const stats = await fs.lstat(filePath);

//             if (stats.isDirectory()) {
//                 console.log(`${file} é uma pasta.`);
//             } else if (stats.isFile()) {
//                 console.log(`${file} é um arquivo.`);
//             }
//         }
//     } catch (err) {
//         console.error('Erro ao ler o diretório:', err);
//     }

// 	res.send(files);
// });



app.get('/', (req, res) => res.send("teste"));

// USER
getInfoHome(app);
getTabela(app);
getJogos(app);
// USER

// ADM
updateJogos(app);
updateAtletas(app);
// ADM


app.listen(process.env.PORT || 3000, () => {
	const currentDate = new Date();
	const hora = currentDate.getHours();
	const minuto = currentDate.getMinutes();
	const segundo = currentDate.getSeconds();

	console.log(`Servidor online as: ${hora}:${minuto}:${segundo}`);
});


// LINK DO PARANAUE
// https://api-7-circuito-badbons-open.onrender.com/