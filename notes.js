let tabs = localStorage.getItem('tabs');
if (tabs == null) {
    tabs = 1;
    localStorage.setItem('tabs', '1');
    localStorage.setItem('titles', 'Default');
    localStorage.setItem('page0', 'Some notes here');
}

let titles = localStorage.getItem('titles').split(',');
let banner = document.getElementById('tab');

let pages = [];
for (let i = 0; i < tabs; i++) {
    pages[i] = localStorage.getItem('page' + i);
    let button = document.createElement('button');
    button.innerHTML = titles[i];
    let click = document.createAttribute('onclick');
    click.value = 'openpage(' + i + ')';
    let edit = document.createAttribute('contenteditable');
    edit.value = 'true';
    button.setAttributeNode(click);
    button.setAttributeNode(edit);
    banner.appendChild(button);
}

let button = document.createElement('button');
button.innerHTML = '+';
button.id = 'plus';
let attr = document.createAttribute('onclick');
attr.value = 'newpage()';
button.setAttributeNode(attr);
banner.appendChild(button);

let pane = document.getElementById('pane');
openpage(0);

function openpage(num) {
    pane.value = pages[num];
    pane.attr = num;
    pane.style.height = pane.scrollHeight + "px";
    let butts = document.getElementsByTagName('button');

    for (let i = 0 ; i < butts.length - 1; i++) {
        if (num == i) {
            butts[i].style = "background-color: #ccc;";
        } else {
            butts[i].style = "background-color: inherit;"
        }
    }
}

function newpage() {
    localStorage.setItem('page' + tabs, '');

    let button = document.createElement('button');
    button.innerHTML = 'NewPage';
    let click = document.createAttribute('onclick');
    click.value = 'openpage(' + tabs + ')';
    let edit = document.createAttribute('contenteditable');
    edit.value = 'true';
    button.setAttributeNode(click);
    button.setAttributeNode(edit);
    banner.insertBefore(button, document.getElementById('plus'));

    tabs++;
    localStorage.setItem('tabs', tabs);
    localStorage.setItem('titles', titles + ',New Page');
}

pane.oninput = function() {
    pane.style.height = "";
    pane.style.height = pane.scrollHeight + "px";
};

function change() {
    localStorage.setItem('page' + pane.attr, pane.value);
    pages[pane.attr] = pane.value;
}

var count = 0;
banner.addEventListener('input', () => {
    setTimeout(changeTitle, 5000, ++count);
});

function changeTitle(val) {
    console.log(val, count);
    if (val == count) {
        let butts = banner.childNodes;
        let head = butts[0].innerHTML;
        for (let i = 1; i < butts.length - 1; i++) {
            head += "," + butts[i].innerHTML;
        }
        console.log(butts);
        localStorage.setItem('titles', head);
    }
}

window.onbeforeunload = function() {
    localStorage.setItem('page' + pane.attr, pane.value);
}
