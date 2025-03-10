function updateIframe() {
    const url = document.getElementById("urlInput").value;
    const width = document.getElementById("widthInput").value;
    const height = document.getElementById("heightInput").value;
    
    // Save to localStorage
    localStorage.setItem('savedUrl', url);
    localStorage.setItem('savedWidth', width);
    localStorage.setItem('savedHeight', height);
    
    const iframe = document.getElementById("previewFrame");
    const container = document.querySelector('.device-container');
    const deviceView = document.querySelector('.device-view');
    
    // Set base dimensions
    iframe.style.width = width + 'px';
    iframe.style.height = height + 'px';
    container.style.width = width + 'px';
    container.style.height = height + 'px';
    
    // Calculate available space (accounting for margins)
    const availableWidth = deviceView.clientWidth - 40; // 20px margin on each side
    const availableHeight = deviceView.clientHeight - 40;
    
    // Calculate scale if container is too large
    let scale = 1;
    if (width > availableWidth || height > availableHeight) {
        const scaleX = availableWidth / width;
        const scaleY = availableHeight / height;
        scale = Math.min(scaleX, scaleY);
        
        container.style.transform = `scale(${scale})`;
    } else {
        container.style.transform = 'none';
    }
    
    // Update URL and inject viewport meta tag
    if (iframe.src !== url) {
        iframe.src = url;
        iframe.onload = function() {
            try {
                const iframeDoc = iframe.contentWindow.document;
                
                // Remove existing viewport meta tag if it exists
                const existingMeta = iframeDoc.querySelector('meta[name="viewport"]');
                if (existingMeta) {
                    existingMeta.remove();
                }
                
                // Add new viewport meta tag
                const meta = iframeDoc.createElement('meta');
                meta.name = 'viewport';
                meta.content = `width=${width}, initial-scale=1.0`;
                iframeDoc.head.appendChild(meta);
                
                // Force the content to fit the iframe width
                const html = iframeDoc.documentElement;
                html.style.width = width + 'px';
                html.style.height = height + 'px';
                html.style.overflow = 'auto';
            } catch(e) {
                console.log("Cannot modify iframe content due to same-origin policy");
            }
        };
    }
}

function clearCache() {
    const iframe = document.getElementById("previewFrame");
    const url = document.getElementById("urlInput").value;
    
    // Force a complete reload by adding a timestamp
    const timestamp = new Date().getTime();
    const hasQuery = url.includes('?');
    const newUrl = url + (hasQuery ? '&' : '?') + 'cache=' + timestamp;
    
    iframe.src = 'about:blank';
    
    // Use a longer timeout to ensure about:blank is loaded
    setTimeout(() => {
        iframe.src = newUrl;
    }, 200);
}

function saveSettings() {
    const url = document.getElementById("urlInput").value;
    const width = document.getElementById("widthInput").value;
    const height = document.getElementById("heightInput").value;
    
    localStorage.setItem('savedUrl', url);
    localStorage.setItem('savedWidth', width);
    localStorage.setItem('savedHeight', height);
    
    alert('Settings saved!');
}

// Load saved settings on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedUrl = localStorage.getItem('savedUrl');
    const savedWidth = localStorage.getItem('savedWidth');
    const savedHeight = localStorage.getItem('savedHeight');
    
    if (savedUrl) document.getElementById("urlInput").value = savedUrl;
    if (savedWidth) document.getElementById("widthInput").value = savedWidth;
    if (savedHeight) document.getElementById("heightInput").value = savedHeight;
    
    updateIframe();
});

// Handle Enter key press
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        updateIframe();
    }
});

// Add resize handler
window.addEventListener('resize', updateIframe);

// Add this at the end of the file
document.getElementById('currentYear').textContent = `Interadsion Studio @ ${new Date().getFullYear()}`;
