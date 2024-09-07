import express from "express";
import cors from "cors";

// ADM
import { getCategoria, updateCategoria, creatCategoria, deleteCategoria } from "./adm/categoria.js";
import updateJogos from "./adm/jogos.js";
import updateAtletas from "./adm/atletas.js";
// ADM

// USER
import getInfoHome from "./user/info.js";
import getTabela from "./user/tabela.js";
import getJogos from "./user/jogos.js";
// USER

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send("teste"));

// ADM
getCategoria(app);
creatCategoria(app);
deleteCategoria(app);
updateCategoria(app);
updateJogos(app);
updateAtletas(app);
// ADM

// USER
getInfoHome(app);
getTabela(app);
getJogos(app);
// USER

app.listen(process.env.PORT || 3000, () => {
	const currentDate = new Date();
	const hora = currentDate.getHours();
	const minuto = currentDate.getMinutes();
	const segundo = currentDate.getSeconds();

	console.log(`Servidor online as: ${hora}:${minuto}:${segundo}`);
});


// LINK DO PARANAUE
// 