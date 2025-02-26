function updateIframe() {
  var url = document.getElementById("urlInput").value;
  var width = document.getElementById("widthInput").value;
  var height = document.getElementById("heightInput").value;

  var iframe = document.getElementById("previewFrame");
  iframe.src = url;
  iframe.width = width;
  iframe.height = height;
}
