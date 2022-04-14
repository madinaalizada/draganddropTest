class Person {
    _id;
    _person;
    constructor(id, person = '') {
        this._id = id;
        this._person = person;
    }
}



const draggable_list = document.getElementById('todo-list');

// const richestPeople = [
//  'Jeff Bezos',
//   'Bill Gates',
//   'Warren Buffett',
//   'Bernard Arnault',
//   'Carlos Slim Helu',
//   'Amancio Ortega',
//   'Larry Ellison',
//   'Mark Zuckerberg',
//   'Michael Bloomberg',
//   'Larry Page'
// ]; 

const richestPeople = [
    new Person(1, 'Jeff Bezos'),
    new Person(2, 'Bill Gates'),
    new Person(3, 'Warren Buffett'),
    new Person(4, 'Bernard Arnault'),
    new Person(5, 'Carlos Slim Helu'),
    new Person(6, 'Mark Zuckerberg'),
    new Person(7, 'Amancio Ortega'),
    new Person(8, 'Larry Page'),
    new Person(9, 'Michael Bloomberg'),
    new Person(10, 'Larry Ellison')
];


const listItems = [];

let dragStartIndex;

createList();

function createList() {
    [...richestPeople]
    .map((person, index) => {
        const listItem = document.createElement('li');
        const todoInput = document.createElement('input');
        todoInput.value = person._person;
        todoInput.classList.add('draggable');
        todoInput.setAttribute('draggable', 'true');

        listItem.setAttribute('data-index', index);

        listItem.appendChild(todoInput);

        listItems.push(listItem);

        draggable_list.appendChild(listItem);
    });

    addEventListeners();
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

/**
 * 
 * @param {Event} e 
 */

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}


function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });

}