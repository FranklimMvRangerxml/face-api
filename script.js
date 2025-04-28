const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const statusDiv = document.getElementById('status');
const emotionSpan = document.getElementById('emotion');
const MODEL_URL = './models';

async function loadModels() {
    try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        statusDiv.innerText = 'Modelos cargados. Iniciando cámara...';
        startVideo();
    } catch (error) {
        console.error("Error loading models:", error);
        statusDiv.innerText = 'Error al cargar los modelos. Revisa la consola.';
    }
}

async function startVideo() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("Error: navigator.mediaDevices.getUserMedia is not available. Ensure you are running in a secure context (HTTPS or localhost).");
        statusDiv.innerText = 'Error: No se puede acceder a mediaDevices. Usa HTTPS o localhost.';
        return;
    }
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        video.srcObject = stream;
    } catch (err) {
        console.error("Error accessing webcam:", err);
        statusDiv.innerText = 'Error al acceder a la cámara web.';
    }
}

video.addEventListener('play', () => {
    statusDiv.innerText = 'Cámara iniciada. Detectando...';

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                                        .withFaceLandmarks()
                                        .withFaceExpressions();

        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (detections && detections.length > 0) {
            const resizedDetections = faceapi.resizeResults(detections, displaySize);

            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

            if (resizedDetections[0].expressions) {
                const expressions = resizedDetections[0].expressions;
                let dominantEmotion = 'neutral';
                let maxProbability = 0;
                for (const [emotion, probability] of Object.entries(expressions)) {
                    if (probability > maxProbability) {
                        maxProbability = probability;
                        dominantEmotion = emotion;
                    }
                }
                emotionSpan.innerText = `${dominantEmotion} (${Math.round(maxProbability * 100)}%)`;
            } else {
                 emotionSpan.innerText = '---';
            }

        } else {
            emotionSpan.innerText = '---';
        }
    }, 100);
});

loadModels();
