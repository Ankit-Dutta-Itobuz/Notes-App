const form = document.querySelector('#form');
const title = document.querySelector('#title');
const text = document.querySelector('#task');
const submit = document.querySelector('#submit');
const msgErr = document.querySelector('#msgErr');
const taskContainer = document.querySelector('#taskContainer');
const popUp = document.querySelector('.popUp');
const updateVisibility = document.querySelector('#updateButton');
const themeBtn = document.querySelector('#themeBtn');

let noteToBeDeleted = null;
// const taskBox = document.querySelector('#taskBox');


function getAllNotes() {
    taskContainer.innerHTML = '';
    fetch("http://localhost:3000/getNotes")
        .then((response) => response.json())
        .then((json) => {
            for (let i = 0; i < json.data.length; i++) {
                taskContainer.innerHTML +=
                    `<div class="card col-xl-3 col-lg-4 col-md-6 col-8 my-auto yellowBg">
                    <div class="card-body d-flex flex-column gap-3 justify-content-evenly align-items-evenly">
                      <h5 class="card-title" id="noteTitle">${json.data[i].title}</h5>
                      <p class="card-text" id="noteText">${json.data[i].text}</p>
                      <div class="buttonBox row justify-content-around">
                        <button href="#" id="edit" class="buttonScale col-xl-5 col-lg-6 col-6 violetBg" onclick="editNote('${json.data[i]._id}')"><div class="row justify-content-center">
                        <img src="./images/edit-cover-1481-svgrepo-com.svg" class="col-6" alt="edit logo not found">
                      </div></button>
                        <button href="#" id="delete" class="buttonScale col-xl-5 col-lg-6 col-6 violetBg" onclick="deleteNote('${json.data[i]._id}')"><div class="row justify-content-center">
                        <img src="./images/square-delete-svgrepo-com.svg" class="col-6" alt="delete logo not found">
                      </div></button>
                    </div>
                    </div>
                  </div>`
            }
        });
    submit.classList.toggle('visible');
}

async function editNote(id) {
    await fetch(`http://localhost:3000/note/${id}`)
        .then((response) => response.json())
        .then((json) => {
            document.getElementById('title').value = json.data.title;
            document.getElementById('task').value = json.data.text;
        })
    document.getElementById('updateButton')
        .setAttribute("onclick", `update('${id}')`);
    updateVisibility.classList.add('visible');
    submit.classList.remove('visible');
    msgErr.classList.add('success');
    msgErr.innerHTML = 'Start Editing';
    setTimeout(() =>{ msgErr.classList.remove('success');msgErr.innerHTML = '';}, 2000);
}

async function update(id) {
    await fetch(`http://localhost:3000/update/${id}`,
        {
            method: "PUT",
            headers: { "Content-type": "application/json; charset=UTF-8", },
            body: JSON.stringify({
                title: document.getElementById('title').value,
                text: document.getElementById('task').value
            }),
        }).then((res) => {
            getAllNotes();
        })
        .catch((err) => console.log(err));
    document.getElementById('title').value = '';
    document.getElementById('task').value = '';
    updateVisibility.classList.remove('visible');
    msgErr.classList.add('success');
    msgErr.innerHTML = 'Successfully Updated';
    // setTimeout(() => msgErr.innerHTML = '', 2000);
    setTimeout(() =>{ msgErr.classList.remove('success');msgErr.innerHTML = '';}, 2000);
}

async function confirmDelete() {
    const response = await fetch(`http://localhost:3000/delete/${noteToBeDeleted}`, {
        method: "DELETE",
    });
    getAllNotes();
    popUp.classList.remove('visible');
    msgErr.classList.add('success');
    msgErr.innerHTML = 'Successfully Deleted';
    submit.classList.add('visible');
    setTimeout(() =>{ msgErr.classList.remove('success');msgErr.innerHTML = '';}, 2000);
}

function cancelDelete() {
    popUp.classList.remove('visible');
}

function deleteNote(uniqueId) {
    noteToBeDeleted = uniqueId;
    popUp.classList.add('visible');
}




submit.addEventListener('click', onSubmit);
async function onSubmit(e) {
    e.preventDefault();
    if (title.value.trim() === '' || text.value.trim() === '') {
        msgErr.classList.add('fail');
        msgErr.innerHTML = 'Please enter all fields';
        setTimeout(() =>{ msgErr.classList.remove('fail');msgErr.innerHTML = '';}, 2000);
        // msgErr.classList.remove('fail');
    }
    else {
        await fetch("http://localhost:3000/addNotes", {
            method: "POST",
            body: JSON.stringify({
                title: title.value,
                text: text.value,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },

        });
        taskContainer.innerHTML = '';
        getAllNotes();
        title.value = '';
        task.value = '';
        msgErr.classList.add('success');
        msgErr.innerHTML = 'Successfully added';
        submit.classList.add('visible');
        setTimeout(() =>{ msgErr.classList.remove('success');msgErr.innerHTML = '';}, 2000);
        // msgErr.classList.remove('success');
    }
}

getAllNotes();