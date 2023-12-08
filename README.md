## Requisitos
Agregar un archivo `.env` con los siguientes datos:
```
MONGO_URI= {conexión url a una base de datos mongo}
PORT=5000
TOKEN_TMBD= {token para usar TMBD, no obligatorio}
JWT_KEY= {key encode64 para firmar el JWT}
```

## Ejecución
`npm start`