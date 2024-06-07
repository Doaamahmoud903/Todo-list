var taskName = document.getElementById("taskName");
var addInput = document.getElementById("addInput");
var alertName = document.getElementById("alertName");
var btnUpdate = document.getElementById("btnUpdate");
var filterTasks = document.getElementById("filterTasks");
var taskContainer;
var currentIndex = -1;

///------------------------------------------
  if(localStorage.getItem('tasks')){
    taskContainer = JSON.parse(localStorage.getItem('tasks'));
    displayTasks();
  }else{
    taskContainer =[];
  }
// Add Task -----------------------------------
function addTask(){
    if(validateTask){
        var task ={
            name: taskName.value,
            completed: false
        }
        taskContainer.push(task);
        console.log(taskContainer);
        localStorage.setItem('tasks' , JSON.stringify(taskContainer));
        clearTask();
        displayTasks();
    }   
}

addInput.addEventListener('click' ,(e)=>{
    e.preventDefault();
    addTask();
})
// Clear Task -----------------------------------
function clearTask(){
    taskName.value ='';
}

//Display all Tasks -----------------------------
function displayTasks(){
    var table =``;
    var filter = filterTasks.value;
    for(var i=0 ; i<taskContainer.length ; i++){
        let taskClass = taskContainer[i].completed ? 'completed' : 'uncomplete';
        if (filter === 'completed' && !taskContainer[i].completed) continue;
        if (filter === 'uncompleted' && taskContainer[i].completed) continue;
        table +=`
   
        <div class="input-group my-3 d-flex justify-content-center">   
            <div style="width:65%" class="border bg-light rounded form-control-lg ${taskClass}">${taskContainer[i].name}</div>
           <button class="btn btn-outline-secondary" type="button" onclick='completeTask(${i})'><i class="fas fa-check text-success"></i></button>
           <button class="btn btn-outline-secondary" type="button" onclick='updateTask(${i})'><i class="fas fa-edit text-primary"></i></i></button>
            <button class="btn btn-outline-secondary" type="button" onclick='deleteTask(${i})'><i class="fas fa-trash text-danger"></i></button>
          </div>
`;

    }
    document.getElementById("taskBody").innerHTML=table;
}
///Delete Task --------------------------------------------------------------

function deleteTask(index){
    taskContainer.splice(index , 1);
    localStorage.setItem('tasks' , JSON.stringify(taskContainer));
    displayTasks();
}
//Update Task --------------------------------------------------------------
function updateTask(index){
    currentIndex = index;
    taskName.value = taskContainer[index].name;
    addInput.classList.add('d-none');
    btnUpdate.classList.remove('d-none');
}

btnUpdate.addEventListener('click' ,(e) => {
    e.preventDefault();
    addUpdate();
});

function addUpdate(){
    taskContainer[currentIndex].name = taskName.value;
    btnUpdate.classList.add('d-none');
    addInput.classList.remove('d-none');
    localStorage.setItem('tasks', JSON.stringify(taskContainer));
    displayTasks();
    clearTask();

}

//Complete Task --------------------------------------------------------
function completeTask(index){
    taskContainer[index].completed = !taskContainer[index].completed;
    localStorage.setItem('ourTasks', JSON.stringify(taskContainer));
    displayTasks();
}

filterTasks.addEventListener('change', displayTasks);
/////Validate Task.-------------------------
function validateTask(){
    var regexName =/^[a-z A-Z]{3,}/;
    if (regexName.test(taskName.value) == true){
        alertName.classList.remove("d-block");
        alertName.classList.add("d-none");
        addInput.removeAttribute("disabled");
        btnUpdate.removeAttribute("disabled");
        return true;
    }
    else{
        alertName.classList.remove("d-none");
        alertName.classList.add("d-block");
        addInput.setAttribute("disabled", "true");
        btnUpdate.setAttribute("disabled", "true");
        return false;
    }

}

taskName.addEventListener("blur", validateTask);