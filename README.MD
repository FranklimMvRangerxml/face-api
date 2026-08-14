 <!-- filepath: /Users/anthonyquiranza/Documents/Programación/face-api/README.md -->
 # 👁️✨ Detección Facial y Emociones en Tiempo Real con face-api.js
 
 <!-- Badges -->
 <p align="center">
   <img src="https://img.shields.io/badge/HTML5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
   <img src="https://img.shields.io/badge/CSS%203-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
   <img src="https://img.shields.io/badge/JavaScript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript"/>
   <img src="https://img.shields.io/badge/face--api.js-brightgreen.svg?style=for-the-badge" alt="face-api.js"/>
   <a href="https://opensource.org/licenses/MIT"> <!-- Adjust link if using a different license -->
     <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT"/>
   </a>
 </p>
 
 ¡Bienvenido/a! Esta es una aplicación web que demuestra el poder de la inteligencia artificial en el navegador. Utiliza la biblioteca **face-api.js** para detectar rostros, visualizar puntos clave faciales (landmarks) y reconocer emociones en tiempo real, ¡todo directamente desde tu cámara web!
 
 
 ## ✨ Características Principales
 
 *   ** Detección de Rostros en Vivo:** Identifica caras en el flujo de video de la cámara web al instante.
 *   ** Visualización de Puntos Clave (Landmarks):** Dibuja los 68 puntos característicos del rostro sobre las caras detectadas, mostrando la estructura facial.
 *   ** Reconocimiento de Emociones:** Analiza las expresiones faciales y muestra la emoción dominante detectada (ej: neutral, feliz, triste, enfadado, sorprendido, disgustado, temeroso) junto con un porcentaje de confianza. ¡Mira cómo reacciona a tus expresiones!
 *   ** Ejecución 100% en el Navegador:** Toda la magia sucede localmente en tu navegador gracias a JavaScript, sin necesidad de servidores complejos para el procesamiento de IA.
 
 ## 🛠️ Tecnologías Utilizadas
 
 *   HTML5
 *   CSS3 (con diseño responsivo básico)
 *   JavaScript Moderno (ES6+)
 *   **[face-api.js](https://github.com/justadudewhohacks/face-api.js):** La biblioteca estrella para la detección y análisis facial en JavaScript.
 
 ## ⚙️ Configuración e Instalación
 
 Sigue estos pasos para poner en marcha el proyecto en tu máquina local:
 
 1.  **Clona el repositorio:**
     ```bash
     git clone github.com/AnthonyQuiranza/face-api
     cd face-api 
     ```
 
 2.  **Descarga los Modelos Pre-entrenados de face-api.js:**
     *   ¡Estos son los "cerebros" de la aplicación! Necesitas los archivos de pesos pre-entrenados para que la detección funcione. Puedes descargarlos desde el [repositorio oficial de face-api.js (carpeta weights)](https://github.com/justadudewhohacks/face-api.js/tree/master/weights).
     *   Los modelos específicos que necesitas para este proyecto son:
         *   `tiny_face_detector_model` (para detectar caras rápidamente)
         *   `face_landmark_68_model` (para los puntos clave)
         *   `face_expression_model` (para reconocer emociones)
     *   Crea una carpeta llamada `models` en la raíz de tu proyecto (`/rutaatuproyecto/face-api/models`).
     *   Coloca **todos** los archivos descargados (generalmente un `.json` y un `.weights` o `.bin` por cada modelo) directamente dentro de esta carpeta `models`. La estructura debe quedar así:
       ```
       face-api/
       ├── index.html
       ├── script.js
       ├── style.css
       └── models/
           ├── face_expression_model-weights_manifest.json
           ├── face_expression_model.weights
           ├── face_landmark_68_model-weights_manifest.json
           ├── face_landmark_68_model.weights
           ├── tiny_face_detector_model-weights_manifest.json
           └── tiny_face_detector_model.weights
       ```
 
 3.  **Ejecuta un Servidor Web Local:**
     *   **¡Importante!** Por razones de seguridad del navegador (políticas CORS y requisitos de `getUserMedia`), no puedes simplemente abrir el archivo `index.html` haciendo doble clic. Necesitas servir los archivos a través de un servidor local.
     *   **Opción 1: Usando Python (si lo tienes instalado):**
       ```bash
       # Asegúrate de estar en la carpeta raíz del proyecto (face-api)
       # Si usas Python 3:
       python -m http.server 
       # Si usas Python 2:
       # python -m SimpleHTTPServer
       ```
     *   **Opción 2: Usando Node.js (con `http-server`):**
       ```bash
       # Instala http-server globalmente si aún no lo tienes: npm install -g http-server
       # Asegúrate de estar en la carpeta raíz del proyecto (face-api)
       http-server
       ```
     *   **Opción 3: Usando la extensión "Live Server" de VS Code:**
       *   Si usas Visual Studio Code, instala la extensión "Live Server".
       *   Abre la carpeta del proyecto en VS Code.
       *   Haz clic derecho sobre el archivo `index.html` y selecciona "Open with Live Server".
 
 ## ▶️ Cómo Usar la Aplicación
 
 1.  Una vez que tu servidor local esté corriendo, abre tu navegador web preferido.
 2.  Ve a la dirección que te indicó el servidor (normalmente `http://localhost:8000`, `http://127.0.0.1:8000`, o `http://localhost:8080`).
 3.  El navegador te pedirá permiso para acceder a tu cámara web. ¡Debes **permitirlo** para que la aplicación funcione!
 4.  La aplicación cargará los modelos (verás un mensaje de estado), iniciará la cámara y comenzará a mostrar las detecciones en tiempo real sobre el video y en el panel de resultados. ¡Prueba a hacer caras! 😄😠😲😢
 
 ## ⚠️ Notas Importantes
 
 *   **Contexto Seguro (HTTPS/Localhost):** La API `getUserMedia` (para acceder a la cámara) sólo funciona en contextos seguros. Esto significa que **debes** acceder a la página a través de `https` (si tuvieras un certificado) o, más comúnmente para desarrollo local, usando `http://localhost` o `http://127.0.0.1`. Acceder mediante `file:///` o IPs de red local (como `http://192.168.x.x`) probablemente **no funcionará**.
 *   **Carga de Modelos:** Verifica que la carpeta `models` esté en el lugar correcto (raíz del proyecto) y contenga todos los archivos necesarios. Si tienes problemas, revisa la consola de desarrollador de tu navegador (usualmente presionando F12) para ver mensajes de error detallados.
 
 
