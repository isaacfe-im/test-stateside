# test-stateside
test Jr FE

#Template Twig a HTML


##Configuración para las plantillas

Para iniciar el proyecto hay que ejecutar **sudo npm install**, para descargar las dependencias de **Grunt.js**, después ejecutar grunt. 

Después ejecutar **sudo composer install**.

El proyecto cuenta con los siguientes directorios:

* **App** (Contiene las clases PHP para el envío de correo)
* **assets** (Contiene los archivos Js, Css, imágenes, .htaccess, favicon y demás archivos de la carpeta public o dev)
* **data** (Contiene un archivo **data.json** con las rutas y configuración del proyecto)
* **sass** (Archivos de SASS)
* **views** (Contiene las vistas y el layout Twig)

El archivo **.htaccess** se encarga de ocultar las extensiones **.html** y **.php** de los archivos para generar URLS amigables.

Para agregar los links se utiliza **{{ path['asesoria-section'] }}**, el valor de **path** hace referencia a un valor dentro del archivo **data.json**.

En el **data.json** hay una llave **config** que posee valores globales como

* Titulo
* Descripcion
* Idioma
* URL del sitio de produccion
* Etc

##Correr Grunt en Desarrollo y Producción
Al ejecutar **grunt** se iniciara la compilacion del sitio en la carpeta dev
Al ejecutar **grunt prod** se iniciara ejecutara la tarea de Produccion una sola vez y se creara la carpeta web con los archivos de Producción

**CONFIGURAR LOCALHOST**
 - Debe apuntar a la carpeta dev.

#Links de la documentación del compilador TWIG
[Twig JS](http://showmethecode.es/php/twig/twig-js-plantillas-twig-en-el-lado-del-cliente/)

[Twig Grunt](https://github.com/stefanullinger/grunt-twig-render)

[Pagina de Twig](http://twig.sensiolabs.org/)

