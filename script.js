const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('canvas');
const canvasCtx = canvasElement.getContext('2d');

const glassesImage = new Image();
glassesImage.src = 'eyeglass.png'; // Replace with your glasses image URL

    function onResults(results) {
        canvasCtx.save();
       
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

            if (results.multiFaceLandmarks) {
                for (const landmarks of results.multiFaceLandmarks) {
                    // Get eye landmarks
                    const leftEye = landmarks[33];  // Left eye outer corner
                    const rightEye = landmarks[263]; // Right eye outer corner

                    // Calculate glasses dimensions and position
                    const eyeDistance = Math.sqrt(
                        Math.pow((rightEye.x - leftEye.x) * canvasElement.width, 2) +
                        Math.pow((rightEye.y - leftEye.y) * canvasElement.height, 2)
                    );
                    
                    
                    const glassesWidth = eyeDistance * 1.8;
                    const glassesHeight = glassesWidth * 0.5;
                    const centerX = (leftEye.x + rightEye.x) / 2 * canvasElement.width;
                    const centerY = (leftEye.y + rightEye.y) / 2 * canvasElement.height;

                    //angle reset
                    const dx= (leftEye.x +rightEye.x) * canvasElement.width;
                    const dy = (leftEye.y + rightEye.y) * canvasElement.height;
                    //const rotation = Math.atan2(dy/dx);

                    // Draw glasses
                    //canvasCtx.translate(centerX, centerY);
                    
                    canvasCtx.drawImage(
                        glassesImage,
                        centerX-glassesWidth/2,
                        centerY-glassesHeight/2,
                        glassesWidth,
                        glassesHeight
                    );
        }
    }
    canvasCtx.restore();
}

const faceMesh = new FaceMesh({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
    }
});

faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});

faceMesh.onResults(onResults);

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await faceMesh.send({image: videoElement});
    },
    width: 640,
    height: 480
});

camera.start();
