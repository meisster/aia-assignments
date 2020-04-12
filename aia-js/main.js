getElement = (element) => document.querySelector(element);

getElement('button').onclick = function() {
    const table = document.getElementById('table').querySelector('tbody');
    const rownum = table.childElementCount;

    const row = document.createElement('tr')
    row.id = rownum;
    const author = createInputRow('author', rownum)
    const title = createInputRow('title', rownum)
    const edit = createEditButton(rownum)
    const save = createSaveButton(rownum)
    const remove = createRemoveButton(rownum)
    const buttons = document.createElement('td');
    buttons.appendChild(edit)
    buttons.appendChild(save)
    buttons.appendChild(remove)

    row.appendChild(author);
    row.appendChild(title)
    row.appendChild(buttons)

    table.appendChild(row);
}

const createInputRow = function(name, rownum) {
    const td = document.createElement('td');
    const input = document.createElement('input');
    const p = document.createElement('p');
    p.id = 'p' + name + rownum;
    hide(p);
    input.id = name + rownum;
    td.appendChild(p);
    td.appendChild(input);
    return td;
}

const createRemoveButton = function(rownum) {
    const button = document.createElement('button');
    button.innerHTML = 'Remove';
    button.id = 'remove' + rownum;
    button.addEventListener('click', () => handleRemove(rownum))
    return button;
}
const createSaveButton = function(rownum) {
    const button = document.createElement('button');
    button.innerHTML = 'Save';
    button.id = 'save' + rownum;
    button.addEventListener('click', () => handleSave(rownum))
    return button;
}

const createEditButton = function(rownum) {
    const button = document.createElement('button');
    button.innerHTML = 'Edit';
    button.id = 'edit' + rownum;
    hide(button);
    button.addEventListener('click', () => handleEdit(rownum))
    return button;
}

const handleSave = function(rownum) {
    const author = document.getElementById('author' + rownum);
    const title = document.getElementById('title' + rownum);
    const edit = document.getElementById('edit' + rownum);
    const save = document.getElementById('save' + rownum);
    const authorLabel = document.getElementById('pauthor' + rownum);
    const titleLabel = document.getElementById('ptitle' + rownum);
    authorLabel.innerText = author.value;
    titleLabel.innerText = title.value;
    hide(title)
    hide(author)
    hide(save)
    show(edit)
    show(authorLabel);
    show(titleLabel);
}

const handleRemove = function(rownum) {
    const tr = document.getElementById(rownum);
    document.querySelector('table').querySelector('tbody').removeChild(tr);
}

const handleEdit = function(rownum) {
    const author = document.getElementById('author' + rownum);
    const title = document.getElementById('title' + rownum);
    const edit = document.getElementById('edit' + rownum);
    const save = document.getElementById('save' + rownum);
    const authorLabel = document.getElementById('pauthor' + rownum);
    const titleLabel = document.getElementById('ptitle' + rownum);
    authorLabel.innerText = ''
    show(title)
    show(author)
    show(save)
    hide(edit)
    hide(authorLabel);
    hide(titleLabel);
}

const hide = function(element) {
    element.style.display = 'none'
}

const show = function(element) {
    element.style.display = 'unset'
}