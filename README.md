![Logo](./Macro.png)
# TEMPLATE-NODEJS-EXPRESS

Se ha preparado un template listo para ser desplegado en función lambda utilizando NodeJS con el framework expressJS.
Para realizar el despliegue en aws se utiliza el framework serverless.

En el proyecto se ha redactado la información necesaria de manera breve y legible para todo nuevo desarrollador backend.

## Desplegar Template NodeJS-Express 

Si se desea desplegar el template, Es importante tener una tabla existente en AWS llamada `template-node-dev` con la columna 'id' como llave de partición.

## Temas Puntuales 
 - CommonJS
 - NodeJS - Express
 - AWS Lambda
 - DynamoDB - Dynamoose
 - GIT
 - Docker

## Documentación
 - [CommonJS](https://nodejs.org/api/modules.html)
 - [NodeJS](https://nodejs.org/en/docs/)
 - [Express](https://expressjs.com/es/starter/hello-world.html)
 - [AWS Lambda](https://docs.aws.amazon.com/es_es/lambda/latest/dg/welcome.html)
 - [Dynamo DB](https://docs.aws.amazon.com/dynamodb/index.html)
 - [GIT](https://git-scm.com/docs/git)
 - [DOCKER](https://docs.docker.com/)

## API Endpoints
#### Listar items

~~~
  GET /api/:id?
~~~

| Parametro | Type     | Descripción                    |
| :-------- | :------- | :------------------------------| 
| `id`      | `string` | **NO-Required**. ID API        |

#### POST item

~~~
  POST /api
~~~

| Parametro | Type     | Descripción                          |
| :-------- | :------- | :------------------------------------|
| `id`      | `string` | **Required**. id of item to post     |
| `name`    | `string` | **Required**. name of item to post   |
| `estatus` | `number` | **Required**. estatus of item to post|


#### PUT item

~~~
  PUT /api/:id
~~~

| Parametro | Type     | Descripción                          |
| :-------- | :------- | :------------------------------------|
| `id`      | `string` | **Required**. id of item to put      |
| `name`    | `string` | **Required**. name of item to put    |
| `estatus` | `number` | **Required**. estatus of item to put |

#### DELETE item

~~~
  DELETE /api/:id
~~~

| Parametro | Type     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of item to delete|


## Environment Variables

Para inicializar el proyecto en entorno local, es indispensable las siguientes variables dentro del archivo .env

`PORT`
`AWS_REGION`

## Deployment

Para desplegar el proyecto como función lambda se deberá realizar el siguiente comando:

```bash
  npm run deploy
```

## Screenshots (si es necesario)


## Authors

- [@oscar.romero](https://github.com/fabianmacropay)
- [@jesus.quevedo](https://github.com/macropay-devops)