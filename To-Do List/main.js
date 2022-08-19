let input = document.querySelector('.input')
let submit = document.querySelector('.add')
let tasksDiv = document.querySelector('.tasks')
let deleteAll = document.querySelector('.delete-all')
let tasksArray = []

if (localStorage.getItem('tasks')) {
    tasksArray = JSON.parse(localStorage.getItem('tasks'))
}

getDataLocal()

submit.onclick = function () {
    if (input.value !== "") {
        addTAskToArray(input.value)
        input.value = ""
    }
}

tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains('del')) {
        delLocal(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove()
    }
})
tasksDiv.addEventListener("dblclick", (e) => {
    if (e.target.classList.contains('task')) {
        e.target.classList.toggle('done')
        completedLocal(e.target.getAttribute("data-id"))
    }
})


function addTAskToArray(text) {
    const task = {
        id: Date.now(),
        title: text,
        completed: false,
    }
    tasksArray.push(task)
    addElements(tasksArray)
    addDataLocal(tasksArray)
}

function addElements(tasksArray) {
    tasksDiv.innerHTML = ""
    tasksArray.forEach(task => {
        let div = document.createElement('div')
        div.className = "task"
        if (task.completed) {
            div.className = "task done"
        }
        div.setAttribute('data-id', task.id)
        div.appendChild(document.createTextNode(task['title']))
        let span = document.createElement('span')
        span.className = "del"
        span.appendChild(document.createTextNode("Delete"))
        div.appendChild(span)
        tasksDiv.appendChild(div)
    });
}

function addDataLocal(tasksArray) {
    window.localStorage.setItem('tasks', JSON.stringify(tasksArray))
}
function getDataLocal() {
    let data = window.localStorage.getItem('tasks')
    if (data) {
        let tasks = JSON.parse(data)
        addElements(tasks)
    }
}

function delLocal(taskId) {
    tasksArray = tasksArray.filter((task) => task.id != taskId)
    addDataLocal(tasksArray)
}
function completedLocal(taskId) {
    for (let i = 0; i < tasksArray.length; i++) {
        if (tasksArray[i].id == taskId) {
            tasksArray[i].completed == false ? tasksArray[i].completed = true : tasksArray[i].completed = false
        }
    }
    addDataLocal(tasksArray)
}

deleteAll.onclick = function () {
    tasksDiv.innerHTML = ""
    tasksArray = []
    window.localStorage.clear()
}