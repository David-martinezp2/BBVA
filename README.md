# Juego BBVA Clicker

¡Bienvenido al Juego BBVA Clicker! Esta es una aplicación web progresiva (PWA) inspirada en juegos de puntos incrementales como Cookie Clicker ha sido creada por David Martinez. En este juego, los jugadores ganan puntos haciendo clic en un botón, pueden comprar AutoClickers para generar puntos automáticamente, mejoras para aumentar la producción y MegaClickers para obtener aún más puntos.

## Características

- **Juego BBVA Clicker**: Cada clic genera un punto.
- **AutoClickers**: Los jugadores pueden comprar AutoClickers para generar puntos automáticamente.
- **Mejoras**: Incrementan la productividad de los AutoClickers.
- **MegaClickers**: Generan más puntos que los AutoClickers normales.
- **Ranking**: Muestra el ranking de los jugadores con mayor puntuación.
- **Persistencia**: Los datos de los jugadores se guardan en el localStorage, por lo que pueden continuar su juego desde donde lo dejaron.
- **PWA**: Funciona sin conexión después de haber sido visitada al menos una vez.
- **Responsive**: Diseño optimizado para dispositivos móviles, tabletas y computadoras.

## Tecnologías Utilizadas

- **React** con **TypeScript**
- **React Router** para la navegación
- **CSS Modules** para el diseño
- **Netlify** para el despliegue
- **LocalStorage** para la persistencia de datos
- **Jest** para pruebas unitarias
- **Netlify** para el hosting de la PWA

## Instalación y Ejecución Local

### Requisitos

- Node.js (versión 14 o superior)
- npm o yarn

### Instrucciones

1. Clona el repositorio:

    git clone https://github.com/David-martinezp2/BBVA/tree/master
   
2. Instala las dependencias:

   npm install
   
3. Ejecuta la aplicación localmente:

   npm start

   
4. Abre tu navegador y ve a http://localhost:3000.


## Scripts Disponibles

npm start: Inicia la aplicación en modo de desarrollo.

npm run build: Construye la aplicación para producción en la carpeta build.

npm test: Ejecuta las pruebas unitarias usando Jest.

npm run lint: Corre ESLint para verificar problemas de estilo de código.


## Herramientas de Análisis Estático y Formateo

La aplicación utiliza ESLint y Prettier para garantizar que el código siga un estilo consistente.

Para ejecutar ESLint:
npm run lint

Para ejecutar Prettier:
npm run format


## Pruebas

Para ejecutar las pruebas unitarias, usa:

npm test

## Persistencia y modo Offline

La aplicación utiliza localStorage para almacenar el progreso de cada jugador bajo la clave player_{nombre}, lo que permite continuar el juego donde lo dejaron. Además, es una PWA, lo que significa que puede funcionar en modo offline después de ser cargada una vez.


