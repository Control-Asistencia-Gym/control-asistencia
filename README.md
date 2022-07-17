# Next.js Control-Asistencia
Para correr localmente, se necesita la base de datos
```

docker-compose up -d
```

* el -d, significa __detached__

* MongoDB URL local:

```

mongodb://localhost:27017/controlasistenciadb
```

# Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

## llenar la base de datos con informacion de pruebas
llamar:
```
    http://localhost:3000/api/users
```