import { saveTask, onGetTasks, deleteTask, getTask, updateTask,
        saveImage } from './firebase.js';
import { card } from './ui.js';

const formTask = document.querySelector('#task-form');
const taskContainer = document.querySelector('#tasks-container');
let editStatus = false;
let idForEdit = '';

const actionButtons =  async ({target}) => {
    if(target.classList.contains('delet')){
        deleteTask(target.getAttribute('data-id'));
    }
    if(target.classList.contains('edit')){
        const id = target.getAttribute('data-id');
        const doc = await getTask(id);
        const task = doc.data();
        formTask['task-title'].value = task.title;
        formTask['task-description'].value = task.description;
        editStatus = true;
        idForEdit = id;
        document.querySelector('#btn-task-save').innerText = 'Update';
    }
}

const saveSubmit = (e) => {
    e.preventDefault();
    const title = formTask['task-title'];
    const description = formTask['task-description'];
    const imageName=formTask['file-task'].value.split('\\')[2];
    const imageUrl=document.querySelector('#image').src;

    if(title.value.length > 3 && description.value.length > 3){
    if(!editStatus){
        saveTask(title.value, description.value, imageName, imageUrl);   
    } else {
        updateTask(idForEdit, {
            'title': title.value, 'description': description.value
        });
        editStatus = false;
        document.querySelector('#btn-task-save').innerText = 'Save';
    }
    formTask.reset();
}else{
    alert('Escribe Más');
}
}

const uploadFileAction = (e) => {
    const file = e.target.files[0];

    //console.log(file.type);
    if(file.type.includes('image')){
        saveImage(file);
    }
}

window.addEventListener('DOMContentLoaded', async () => {

    onGetTasks(querySnapshot => {
        if(taskContainer.firstChild)
            taskContainer.removeChild(taskContainer.firstChild)
        const div = document.createElement('div');
        querySnapshot.forEach(doc => {
            const task = doc.data();
            div.appendChild(card(doc.id, task.title, task.description, task.imageUrl))
        });
        taskContainer.appendChild(div);
    });
    
    document.querySelector('#tasks-container').addEventListener('click', actionButtons);
    formTask.addEventListener('submit', saveSubmit);
    document.querySelector('#file-task').addEventListener('change', uploadFileAction);
});

