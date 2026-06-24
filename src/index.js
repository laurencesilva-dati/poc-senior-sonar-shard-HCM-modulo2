// HCM - Modulo Controle de Ponto (vulnerabilidades intencionais)
const express = require('express');
const app = express();

// Vulnerabilidade: IDOR (sem verificacao de permissao)
app.get('/ponto/:funcionario_id', (req, res) => {
    const registros = db.query('SELECT * FROM ponto WHERE func_id = ' + req.params.funcionario_id);
    res.json(registros);
});

// Vulnerabilidade: informacao sensivel em log
app.post('/ponto/registrar', (req, res) => {
    console.log('Registro de ponto - CPF: ' + req.body.cpf + ' Senha: ' + req.body.senha);
    db.query('INSERT INTO ponto (func_id, hora, tipo) VALUES (' + req.body.id + ', NOW(), "' + req.body.tipo + '")');
    res.json({ ok: true });
});

// Code smell: dead code
function calcularHorasExtras(registros) {
    var total = 0;
    var bonus = 0; // nunca usado
    var desconto = 0; // nunca usado
    for (var i = 0; i < registros.length; i++) {
        total += registros[i].horas - 8;
    }
    return total;
}

module.exports = app;
