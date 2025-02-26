function updateIframe() {
    var url = document.getElementById("urlInput").value;
    var inputWidth = parseInt(document.getElementById("widthInput").value);
    var inputHeight = parseInt(document.getElementById("heightInput").value);

    var maxCanvasWidth = window.innerWidth * 0.8; // The middle frame should be 80% of screen width
    var maxCanvasHeight = window.innerHeight * 0.8; // The middle frame should be 80% of screen height

    // Calculate scaling factor
    var scaleX = maxCanvasWidth / inputWidth;
    var scaleY = maxCanvasHeight / inputHeight;
    var scale = Math.min(scaleX, scaleY, 1); // Scale down but never enlarge

    // Apply new iframe properties
    var iframeWrapper = document.getElementById("iframeWrapper");
    var iframe = document.getElementById("previewFrame");

    iframe.src = url;
    iframe.style.width = inputWidth + "px";
    iframe.style.height = inputHeight + "px";
    iframe.style.transform = `scale(${scale})`;
    iframe.style.transformOrigin = "top left"; // Ensures proper scaling

    iframeWrapper.style.width = inputWidth * scale + "px";
    iframeWrapper.style.height = inputHeight * scale + "px";
}
