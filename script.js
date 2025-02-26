function updateIframe() {
    var url = document.getElementById("urlInput").value;
    var inputWidth = parseInt(document.getElementById("widthInput").value);
    var inputHeight = parseInt(document.getElementById("heightInput").value);

    var screenWidth = window.innerWidth - 40; // Allow some margin
    var screenHeight = window.innerHeight - 150; // Allow some margin

    // Calculate aspect ratio
    var aspectRatio = inputWidth / inputHeight;

    // Adjust width and height to fit within the screen
    var finalWidth = inputWidth;
    var finalHeight = inputHeight;

    if (finalWidth > screenWidth) {
        finalWidth = screenWidth;
        finalHeight = finalWidth / aspectRatio;
    }

    if (finalHeight > screenHeight) {
        finalHeight = screenHeight;
        finalWidth = finalHeight * aspectRatio;
    }

    // Apply new width and height
    var iframe = document.getElementById("previewFrame");
    iframe.src = url;
    iframe.style.width = finalWidth + "px";
    iframe.style.height = finalHeight + "px";
}
