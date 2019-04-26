Esse é um Projeto com as configurações básicas para um projeto Node.
Pacotes básicos para execução de qualquer projeto, como express, validadores e etc.


###################################################################################
Configurações iniciais para qualquer projeto Node
###################################################################################
Criar a pasta do projeto

Acessar a pasta do projeto e iniciar o node como seguinte comando:

yarn init -y


Adicionar o eslint para padronizar o código fonte. (Apenas em desenvolvimento)

yarn add eslint -D


Iniciar o eslint:

yarn eslint --init


usar as seguintes opções:
(1)

- ...
- ...
- To check syntax, find problems, and enforce code style

(2)

- ...
- CommonJS (require/exports)
- ...

(3)

- ...
- ...
- ...
- None of these

(4)

- ...
- Node

(5)

- Use a popular style guide
- ...
- ...

(6)

- ...
- Standard (https://github.com/standard/standard)
- ...

(7)

- ...
- ...
- JSON

(8)

- Y



Criar o arquivo `.editorconfig` na raiz, para a configuração do ambiente do VSCode com o seguinte código:

root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true



Instalar o `dotenv` para utilização de variavéis ambiente

yarn add dotenv



Criar o arquivo `.env` na raiz, para definições de variáveis globais do ambiente, com o seguinte código:

NODE_ENV=development



Adicionar o `express` para controle das requisições:

yarn add express



Adicionar o `express-handlebars` para obter as exceptions nas rotas

yarn add express-handlebars



Adicionar o `express-validation` para validação dos dados nas requisições

yarn add express-validation



Adiconar o `express-async-handler` para obter as exceptions de métodos async

yarn add express-async-handler



Adicionar `joi` validador de schema de objetos

yarn add joi



Adicionar o `Youch` para tratar e exibir as exceptions de uma amigavel. (Apenas em desenvolvimento)

yarn add youch -D



Adicionar o `require-dir` para carregamento em lote dos arquivos

yarn add require-dir



Instalar o monitor de código para atualização automática, sem a necessidade de parar e rodar novamente. (Apenas em desenvolvimento)

yarn add nodemon -D



Incluir o script dentro do arquivo `package.json` para executar o projeto com o nomemon

"scripts": {
"start": "nodemon src/index.js"
},


Criar a pasta `src` na raiz do projeto


Criar a pasta `app` dentro da pasta `src`


Criar a pasta `controllers` dentro da pasta `app` para guardar todos os controllers


Criar o arquivo `index.js` dentro da pasta `controllers` para carregar todos os controllers, com o seguinte código:

module.exports = require('require-dir')()



Criar o arquivo `TestController.js` dentro da pasta `controllers` para testar o ambiente, com o seguinte código:

class TestController {
async index (req, res) {
res.send('Hello World! NODE.JS TEST VALIDATOR')
}
}


module.exports = new TestController()


Criar a pasta `validators` dentro da pasta `app` para guardar todos os validadores


Criar o arquivo `index.js` dentro da pasta `validators` para carregar todos os validadores, com o seguinte código:

module.exports = require('require-dir')()



Criar o arquivo `Number.js` dentro da pasta `validators` para validação de números, com o seguinte código:

const Joi = require('joi')
module.exports = {
body: {
number: Joi.number().required()
}
}



Criar o arquivo `routes.js` para controle das rotas, dentro da pasta `src` com o seguinte código:

const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')
const validators = require('./app/validators')

const { TestController } = require(`./app/controllers`)

const routes = express.Router()

routes.get('/', (req, res) => res.send(`Hello World! NODE.JS`))

routes.post('/test', validate(validators.Number), handle(TestController.index))

module.exports = routes



Criar o arquivo `server.js` para controle das requisições, dentro da pasta `src` com o seguinte código:

require('dotenv').config()

const express = require('express')
const routes = require('./routes')
const validate = require('express-validation')
const Youch = require('youch')

class App {
constructor () {
this.express = express()
this.isDev = process.env.NODE_ENV !== 'production'

    this.database()
    this.middleares()
    this.routes()
    this.exception()

}
database () {}
middleares () {
this.express.use(express.json())
}
routes () {
this.express.use(routes)
}
exception () {
this.express.use(async (err, req, res, next) => {
if (err instanceof validate.ValidationError) {
return res.status(err.status).json(err)
}
if (this.isDev) {
const youch = new Youch(err)
return res.json(await youch.toJSON())
}
return res.status(err.status || 500).json({ error: 'Erro Interno' })
})
}
}

module.exports = new App().express



Criar o arquivo `index.js` que será o primeiro arquivo a ser executado, dentro da pasta `src` com o seguinte código:

const server = require('./server')
server.listen(process.env.PORT || 3000)



Apagar o arquivo `package-lock.json`


Executar o comando `yarn` para atualizar os pacotes no `yarn-lock`

yarn



Para testar executar o seguinte comando:

yarn start



Abrir o navegador no endereço:

http://localhost:3000



Verifique a frase no navegador:

Hello World! NODE.JS


Fazer uma requisição pelo insominia na rota `http://localhost:3000/test` passando o paramento number no body. Caso passe uma letra ao invés de número, ele vai mostrar o erro
