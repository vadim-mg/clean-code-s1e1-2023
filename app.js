//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var newTaskInput=document.querySelector(".task-list__field_new");//Add a new task.
var addButton=document.querySelector(".button_add");//first button
var incompleteTaskHolder=document.querySelector("#incomplete-tasks .task-list__items");//ul of #incomplete-tasks
var completedTasksHolder=document.querySelector("#completed-tasks .task-list__items");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.className = "task-list__item"

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    checkBox.type="checkbox";
    checkBox.className="task-list__checkbox"

    //label
    var label=document.createElement("label");//label
    label.innerText=taskString;
    label.className='task-list__task-name';

    //input (text)
    var editInput=document.createElement("input");//text
    editInput.type="text";
    editInput.className="task-list__field";

    //button.edit
    var editButton=document.createElement("button");//edit button
    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="button button_edit";

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    deleteButton.className="button button_delete";
 
    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}


var addTask=function(){
    console.log("Add Task...");
    if (!newTaskInput.value) return;
    var listItem=createNewTaskElement(newTaskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    newTaskInput.value="";
}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('.task-list__field');
    var label=listItem.querySelector(".task-list__task-name");
    var editBtn=listItem.querySelector(".button_edit");
    var containsClass=listItem.classList.contains("task-list__item_changing");
    //If class of the parent is .task-list__item_changing
    if(containsClass){
        //switch to .task-list__item_changing
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .task-list__item_changing on the parent.
    listItem.classList.toggle("task-list__item_changing");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    ul.removeChild(listItem);
}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
// addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".task-list__checkbox");
    var editButton=taskListItem.querySelector(".button_edit");
    var deleteButton=taskListItem.querySelector(".button_delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.