let file = readCookie('file');
if (file != null) {
    console.log(file);
}

document.getElementById('inputfile').addEventListener('change', function() {
    let fr = new FileReader();
    let fileObject = this.files[0];
    fr.readAsText(fileObject);
    var newObject  = {
        'lastModified'     : fileObject.lastModified,
        'lastModifiedDate' : fileObject.lastModifiedDate,
        'name'             : fileObject.name,
        'size'             : fileObject.size,
        'type'             : fileObject.type
    };
    createCookie('file', JSON.stringify(newObject));
});

function createCookie(key, value) {
    let date = new Date();
    date.setDate(date.getDate() + 365);
    let expiration = date.toUTCString();
    let cookie = escape(key) + "=" + escape(value) + ";expires=" + expiration + ";";
    document.cookie = cookie;
 }

function readCookie(name) {
    let key = name + "=";
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(key) === 0) {
            return cookie.substring(key.length, cookie.length);
        }
    }
    return null;
}