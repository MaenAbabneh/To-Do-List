function addTask(value) {
    let ul = document.getElementById('list');
    let li = document.createElement('li');
    let input = document.querySelector('input');

   if(input.value === '') {
       return input.focus();
   }

    li.textContent = input.value;
    input.value = '';
    input.focus();

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    li.appendChild(deleteButton);

    deleteButton.addEventListener('click', function() {
        ul.removeChild(li);
    });

    let doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.className = 'done';
    li.appendChild(doneButton);

    doneButton.addEventListener('click', function() {
        li.style.textDecoration = 'line-through';
    });
    

    ul.appendChild(li);

    saveTasks();
}



function saveTasks(value) {
    let tasks = [];
    let ul = document.getElementById('list');
    let li = ul.getElementsByTagName('li');

    for(let item of li) {
        tasks.push(item.textContent.replace('DeleteDone', '').trim());
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(value) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let ul = document.getElementById('list');
    if (tasks) {
        tasks.forEach(task => {
            let li = document.createElement('li');
            li.textContent = task;

            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete';
            li.appendChild(deleteButton);

            deleteButton.addEventListener('click', function() {
                ul.removeChild(li);
                saveTasksToLocalStorage();  // حفظ المهام بعد الحذف
            });

            let doneButton = document.createElement('button');
            doneButton.textContent = 'Done';
            doneButton.className = 'done';
            li.appendChild(doneButton);

            doneButton.addEventListener('click', function() {
                li.style.textDecoration = 'line-through';
            });

            ul.appendChild(li);
        });
    }


}
window.onload = loadTasks;
    
function deleteAll(value) {
    let ul = document.getElementById('list');
    ul.innerHTML = '';
    localStorage.removeItem('tasks');
}
