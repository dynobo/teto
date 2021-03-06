/**
 * Various helper methods downloading or uploading files.
 */

const TransferUtils = {
  /**
 * Convert CANVAS to encoded PNG and trigger its download.
 * @param {Element} canvas Canvas element with image to download
 * @param {str} fileName Default name of the downloaded file
 */
  downloadCanvasAsPng(canvas, fileName) {
  // Put encoded file into <a> href
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = fileName;
    document.body.appendChild(a);
    // Trigger download dialog
    a.click();
    document.body.removeChild(a);
  },

  /**
   * Convert JS-Object as JSON and triggers its download.
   * @param {Object} obj JavaScript object to be transformed to json
   * @param {str} fileName Default name of the downloaded file
   */
  downloadObjectAsJson(obj, fileName) {
    const encodedObj = encodeURIComponent(JSON.stringify(obj));
    const data = `data:text/json;charset=utf-8,${encodedObj}`;
    const a = document.createElement('a');
    a.href = data;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },

  /**
   * Trigger the file open dialog and uploads the file. Accepts *.json.
   * @param {Function} callback Function to call after upload complete. Receives data as argument.
   */
  uploadJsonFromDisk(callback) {
    const fileInput = document.createElement('input');
    function readFile(e) {
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = function execCallback(event) {
        const contents = event.target.result;
        fileInput.func(contents);
      };
      reader.readAsText(file);
    }
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.style.display = 'none';
    fileInput.onchange = readFile;
    fileInput.func = (data) => {
      callback(JSON.parse(data));
    };
    fileInput.click();
  },

  /**
   * Trigger the file open dialog and uploads the file. Accepts *.json.
   * @param {Function} callback Function to call after upload complete. Receives data as argument.
   */
  loadJsonFromUrl(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onerror = (() => { console.error('Error occurred while loading the template file.'); });
    xhr.onload = function onload() {
      if (this.status === 200) {
        callback(JSON.parse(this.response));
      }
    };
    xhr.send();
  },
};

export default TransferUtils;
