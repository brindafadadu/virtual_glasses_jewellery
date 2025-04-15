const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('canvas');
const canvasCtx = canvasElement.getContext('2d');

const jewlImage = new Image();
jewlImage.src = './public/earrings.png'; 

let inti_noseX = null;

window.selectEarring = function(imageUrl) {
    jewlImage.src = earring.processedImageUrl; // Update the source of the earring image
}

function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
            // Use ear base landmarks
            const leftEarBase = landmarks[132];
            const rightEarBase = landmarks[361];
            const nose = landmarks[1];

            if (inti_noseX == null) {
                inti_noseX = nose.x;
            }

            let noseOffset = nose.x - inti_noseX;
            let headturn = 0.02 // sensitivity limit


            // Calculate earring size and position
            const earringSize = Math.min(canvasElement.width, canvasElement.height) * 0.13; 

            // Increase horizontal separation between earrings
            const horizontalSeparation = earringSize * 0.37; // Adjust this multiplier to increase/decrease gap

            // Left earring - positioned on left ear base with additional horizontal offset
            const leftX = leftEarBase.x * canvasElement.width - (earringSize / 2) - horizontalSeparation;
            const leftY = leftEarBase.y * canvasElement.height - (earringSize / 2);

            // Right earring - positioned on right ear base with additional horizontal offset
            const rightX = rightEarBase.x * canvasElement.width - (earringSize / 2) + horizontalSeparation;
            const rightY = rightEarBase.y * canvasElement.height - (earringSize / 2);

            if(noseOffset < -headturn){
                //head turned right so hide the left earring
                canvasCtx.drawImage(
                    jewlImage,
                    rightX,
                    rightY,
                    earringSize,
                    earringSize
                );
            }

            else if (noseOffset>headturn){
                //head turned left so hide the right earring
                canvasCtx.drawImage(
                    jewlImage,
                    leftX,
                    leftY,
                    earringSize,
                    earringSize
                );
            }

            // head facing forward draw both earrings
            else{ 
                canvasCtx.drawImage(
                jewlImage,
                leftX,
                leftY,
                earringSize,
                earringSize
            );

            // Draw right earring
                canvasCtx.drawImage(
                    jewlImage,
                    rightX,
                    rightY,
                    earringSize,
                    earringSize
                );
            }
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

//the earrings are appearing s bit lower than the ear lobe need to lessen the sensitivity, increase the size a bit and check exact location