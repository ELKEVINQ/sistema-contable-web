Esp
Este codigo fue creado para servir como base de sistema contable web y pagina web con un servidor de angular, y con un backend en codigo escrito en js, 
trabaja con mySQL y aunque no esta completamente comentado, ni esta completamente funcional, puede servir como molde para nuevos sistemas, adjunto comandos
de node para la instalacion y ejecucion del sistema al final.
ENG

This code was created to serve as the foundation for a web-based accounting system and webpage with an Angular server, and with a backend written in JavaScript. 
It works with MySQL and although it is not fully commented or completely functional, it can serve as a template for new systems. Node commands for the 
installation and execution of the system are attached at the end.

(Recomiendo abrirlo en visual studio code con la carpeta nivel45 completa como raiz)
(I recommend opening it in Visual Studio Code with the complete 'nivel45' folder as main directory)
"comandos para terminal/comands for the terminal"
"para el back/for the backend" (Esto trabaja con node.js y nodemon para autoejecucion/This works with node.js and nodemon for auto execution)
cd /backend
npm install (solo 1 vez/just 1 time)
nodemon server.js

"para la web"
cd /nivel45
npm install (solo 1 vez/just 1 time)
ng s -o (ejecuta la web y la abre en el navegador/executes the web page and opens in the browser)

"Base de datos"
creen su base en mySql e importenlo como en internet con el archivo nivel45.sql
just create the database in mySQL and import the nivel45.sql
