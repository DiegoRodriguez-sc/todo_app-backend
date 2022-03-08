# REST API todo_app

Parte Front :  [Todo_app](https://github.com/DiegoRodriguez-sc/todo_app-frontend)

API REST construido con MongoDB, node y express.js para consumir en una app tipo TODO LIST .
<br />
Cuenta con logeo y registro de usuario con token, encriptación de contraseña y rutas privadas y públicas. 

## Clone app

    https://github.com/DiegoRodriguez-sc/todo_app-backend.git

## Install

    npm install

## Run the app

    npm start

## Base Url

`https://dr-todo-app.herokuapp.com/api`

## Authentication Login

### Request

`POST /auth/login`

### Body

    "email":"test@gmail.com",
    "password":"123456"

### Response

    "error": false,
    "msg": "Login ok",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjExMmU3OWM1YzY0YWI5N2QzZjgxMWYiLCJpYXQiOjE2NDY3NjQyMjMsImV4cCI6MTY0Njc5MzAyM30.ubCrpNtG_JdcKRC5wtlqHwKRng4znRgLi4ZVKgVuWK4",
        "user": {
            "name": "test",
            "email": "test@gmail.com",
            "uid": "62112e79c5c64ab97d3f811f"
        }
    }


## Authentication Register

### Request

`POST /auth/register`

### Body

    "email":"test0@gmail.com",
    "password":"123456"

### Response

    "error": false,
    "msg": "Usuario registrado con éxito"


---

## User get all 

### Request

`GET /user`

### Response

    "error": false,
    "total": 1,
    "users": [
        {
            "name": "test",
            "email": "test@gmail.com",
            "uid": "62112e79c5c64ab97d3f811f"
        }]

## User get by Id

### Request

`GET /user/{id}`

### Response

    "error": false,
    "user": {
        "name": "test",
        "email": "test@gmail.com",
        "uid": "62112e79c5c64ab97d3f811f"
    }

## User update

### Request

`PUT /user/{id}`

### Header

    x-token: user token

### Body

    "name":"test1"

### Response

    "error": false,
    "msg": "Usuario actualizado",
    "user": {
        "name": "test1",
        "email": "test@gmail.com",
        "uid": "62112e79c5c64ab97d3f811f"
    }

## User delete

### Request

`DELETE /user/{id}`

### Header

    x-token: user token

### Response

    "error": false,
    "msg": "Usuario borrado",

---

## Get todo by id

### Request

`GET /todo/{id}`

### Header

    x-token: user token

### Response

    "error": false,
    "todo": {
        "bodyTodo": "Aprender node",
        "status": false,
        "category": "WORK",
        "user": {
            "_id": "62112e79c5c64ab97d3f811f",
            "name": "test"
        },
        "createdAt": "2022-03-08T18:49:04.450Z",
        "updatedAt": "2022-03-08T18:49:04.450Z",
        "uid": "6227a5207b83b25de6f1e8c4"
    }

## Get todos by userId

### Request

`GET /todo/user/{userId}`

### Header

    x-token: user token

### Response

    "error": false,
    "todos": [
        {
            "bodyTodo": "Aprender node",
            "status": false,
            "category": "WORK",
            "user": {
                "_id": "62112e79c5c64ab97d3f811f",
                "name": "test"
            },
            "createdAt": "2022-03-08T18:49:04.450Z",
            "updatedAt": "2022-03-08T18:49:04.450Z",
            "uid": "6227a5207b83b25de6f1e8c4"
        }
    ]

## Post todo

### Request

`POST /todo`

### Header

    x-token: user token

### Body

    "bodyTodo":"Aprender node",
    "category":"work"

### Response

    "error": false,
    "msg": "Todo creado",
    "todo": {
        "bodyTodo": "Aprender node",
        "status": false,
        "category": "WORK",
        "user": "62112e79c5c64ab97d3f811f",
        "createdAt": "2022-03-08T18:49:04.450Z",
        "updatedAt": "2022-03-08T18:49:04.450Z",
        "uid": "6227a5207b83b25de6f1e8c4"
    }

## Todo update

### Request

`PUT /todo/{id}`

### Header

    x-token: user token

### Body

    "status":true

### Response

    "error": false,
    "msg": "Todo actualizado",
    "todo": {
        "bodyTodo": "Aprender node",
        "status": true,
        "category": "WORK",
        "user": "62112e79c5c64ab97d3f811f",
        "createdAt": "2022-03-08T18:49:04.450Z",
        "updatedAt": "2022-03-08T18:56:12.946Z",
        "uid": "6227a5207b83b25de6f1e8c4"
    }

## Todo delete

### Request

`DELETE /todo/{id}`

### Header

    x-token: user token

### Response

    "error": false,
    "msg": "Todo borrado",
    "todo": {
        "bodyTodo": "Aprender node",
        "status": true,
        "category": "WORK",
        "user": "62112e79c5c64ab97d3f811f",
        "createdAt": "2022-03-08T18:49:04.450Z",
        "updatedAt": "2022-03-08T18:56:12.946Z",
        "uid": "6227a5207b83b25de6f1e8c4"
    }