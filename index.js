import express from "express";
import cors from "cors";

// USER
import getTabela from "./user/tabela.js";
import getJogos from "./user/jogos.js";
// USER

// ADM
import updateJogos from "./adm/jogos.js";
import updateAtletas from "./adm/atletas.js";
// ADM

import {  } from "./adm/atletas.js";


const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => res.send("teste"));

// USER
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