Proyecto Express Acamica
========================

Bienvenido a este proyecto de Acamica! Si quieres ver las instrucciones completas las puedes encontrar [aquí](https://www.acamica.com/clases/1886/express/proyecto-final).


Cómo correr el ejemplo
-----------------

Crea un fork del proyecto desde github y luego clona el repositorio en un directorio local

```
git clone <url-del-clone>
```

Instala las dependencias

```
npm install
```

Ejecuta el servidor
```
node app.js
```

O si estas desarrollando y quieres que se actualice en forma continua, instala `nodemon` y corre

```
nodemon app.js
```

Cualquier duda consulta en la comunidad de Acamica.

¡Buena suerte!

Librerías utilizadas
--------------------

### Material Design Lite
Porque la estética importa, decidimos hacer el proyecto usando Material Design. Google provee una librería que
incluye CSS y un poco de JS llamada [Material Design Lite](http://www.getmdl.io/). El *lite* es porque no requiere
de otros frameworks y es bastante minimalista. Google también ofrece [Angular Material](https://material.angularjs.org/latest/#/) si trabajamos
con Angular, o
[Paper Elements](https://www.polymer-project.org/0.5/docs/elements/) si trabajamos con polymer.

### Handlebars
Para dibujar las vistas usamos el motor de templates [handlebars](http://handlebarsjs.com/).

### Lodash
Para resolver tareas simples como filtrar los elementos de un mapa, usamos la librería utilitaria [lodash](https://lodash.com/).

### Express-session
La aplicación soporta un concepto de usuarios muy básico, cada navegador "se convierte" en un pseudo usuario por tener una sesión.
Esto es así para que cuando muchos usuarios accedan al mismo tiempo, no vean las tareas de los otros usuarios.

### UUID
Esta es una librería que genera ids aleatorios únicos, y lo utilizamos al no tener una base de datos que nos garantice esto.
# proyecto-express
