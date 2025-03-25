//234	Left ear (near the helix)
// 454	Right ear (near the helix)
// 127	Left ear tip
// 356	Right ear tip
// 132	Left ear base (near jawline)
// 361	Right ear base (near jawline)

const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('canvas');
const canvasCtx = canvasElement.getContext('2d');

const jewlImage = new Image();
jewlImage.src = 'earrings.png'; 

    function onResults(results) {
        canvasCtx.save();
       
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

            if (results.multiFaceLandmarks) {
                for (const landmarks of results.multiFaceLandmarks) {
                    // left ear
                    const leftear_base=landmarks[132];
                    const rightear_base=landmarks[361];
                    
                    //x and y coordinates, overlay img
                    const xleft=leftear_base.x*canvasElement.width;
                    const yleft=leftear_base.y*canvasElement.height;

                    const xright=rightear_base.x*canvasElement.width;
                    const yright=rightear_base.y*canvasElement.height;

                    //img size
                    const img_size=Math.abs(xright-xleft)/4;
                    //angle reset


                    canvasCtx.drawImage(
                        jewlImage,
                       (xleft-img_size)/2,
                       (yleft-img_size)/2,
                       img_size,
                       img_size
                    );
                    
                    canvasCtx.drawImage(
                        jewlImage,
                       (xright-img_size)/2,
                       (yright-img_size)/2,
                       img_size,
                       img_size
                    );
                    canvasCtx.restore();
                   
        }
    }
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