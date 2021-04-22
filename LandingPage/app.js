//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//DOM elements
const time = document.getElementById('time'),
    greeting = document.getElementById('greeting');

//Event Listeners
todoButton.addEventListener('click', addTodo);

//Deleting Items
todoList.addEventListener('click', deleteCheck);

//Filtering Items
filterOption.addEventListener('change', filterTodo);

//Functions

function addTodo(event){
    //preventDefault(); stops the page from refreshing(ie the 'form' from submitting)
    event.preventDefault();
    
    //Todo DIV creator(Holds Li, check btn, delete btn)
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //Create List aka Li tag
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); //sticking the li tag to the todo div

    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = 'O';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //Delete Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = 'X';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);

    //Clearing input after entering
    todoInput.value="";
}

//Deleting items Function
function deleteCheck(e){
    const item = e.target;
    //Delete TODO
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement; //grabs the input list element
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
        
    }

    //CHECK OFF TODO
    if(item.classList[0] === 'complete-btn'){
      const todo = item.parentElement;
      todo.classList.toggle('completed'); //changes the id to completed
      item.style.backgroundColor =  'rgb(89, 219, 89)';  
    }
}

//FUNCTION FILTER
//NOTE an error popped at first saying "can't read property contains of undefined"
//this is because there was space inbetween the 'todo-list' ul tags, can't have empty space between them!
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach((todo)=>{
        switch(e.target.value){  //brings back the option tag(all, completed, etc)
            case "all":
                todo.style.display = 'flex'; 
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }  
                break;
        }
    })
}

//ADD DATE AND TIME FUNCTION - Display the date, hour, minute, below the To-do header and above the list.
function showTime(){
    let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
//Setting AM or PM
const ampm = hour >= 12 ? 'PM' : 'AM';

//12hr Time Formatting
hour = hour % 12 || 12;

//Outputting Time
time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}<span>:</span>${ampm}`;

setTimeout(showTime, 1000);
}

//Add Zero to minutes/seconds
function addZero(n){
    return(parseInt(n, 10) < 10 ? '0' : '') + n;
}

//Set background colors and Greeting
function setBgNdGreet(){
    let today = new Date(),
    hour = today.getHours();

    if(hour < 12){
        //morning
        greeting.textContent = 'Good Morning';
        document.body.style.backgroundImage = 'url(img/pt-morning.jpg';
        filterOption.style.color = 'white';
        filterOption.style.background = '#66CCFF';
    }else if(hour < 18){
        //afternoon
        greeting.textContent = 'Good Afternoon'
        document.body.style.backgroundImage = 'url(img/pt-afternoon)';
        filterOption.style.color = 'white';
        filterOption.style.background = '#66CCFF';
    }else{
        //evening
        document.body.style.backgroundImage = "url(img/pt-night.jpg)" ;
        document.body.style.backgroundRepeat = "repeat-y";
        greeting.textContent = 'Good Evening';
        todoButton.style.background = 'rgb(0, 0, 139, 1)';
        todoButton.style.color = 'white';
        filterOption.style.color = 'white';
        filterOption.style.background = 'rgb(0,0,139,1)';
      
    }
}

//Call func
showTime();
setBgNdGreet();