console.log('js ready');
$(document).ready(readyNow);

function readyNow() {
    console.log('ready!');
    refreshToDos();
$('form').on('submit', function (event) {
    event.preventDefault();
    submitTask();
});
$('#seeToDos').on('click', '#deleteButton', deleteClicked);
$('#seeToDos').on('click', '#completeButton', completeClicked);
}
    var toDoItem = $('#toDoIn').val();
    var noteText = $('#noteIn').val();
    var todoComplete = false;

function submitTask() {
    // var toDoItem = $('#toDoIn').val();
    // var noteText = $('#noteIn').val();
    // var todoComplete = false;
    console.log('task:', toDoItem);
    console.log('note:', noteText);
    var objectToSend = {
        task: toDoItem,
        notes: noteText,
        complete: complete
    }
    $('#toDoIn').val('');
    $('#noteIn').val('');
  saveToDo(objectToSend);
}

function saveToDo(objectToSend) {
$.ajax({
    url: '/todo',
    type: 'POST',
    data: objectToSend,
    success: function (data){
   console.log('added a new to do', data); 
   refreshToDos();
    }
    
});
    
}

function refreshToDos() {
    $.ajax({
        type: 'GET',
        url: '/todo'
    }).done(function (response) {
        var toDoList = response;
        appendToDos(toDoList);
    }).fail(function (error) {
        alert('uh oh', error);
    });
}

function appendToDos(todos) {
    $('#seeToDos').empty();
    for (var i = 0; i < todos.length; i += 1) {
        var todo = todos[i];
        var $tr = $('<p></p>');
        $tr.data('To Do:', todo);
        $tr.append('<span>To do: ' + todo.task +  '  </span> ');
        $tr.append('<span> Notes: ' + todo.notes +  '  </span> ');
        $tr.append('<button id="deleteButton" class="btn btn-danger" data-id="' + todo.id + '">Delete</button>');
        $tr.append('<button id="completeButton" class="btn btn-success" data-id="' + todo.id + '">Complete</button><br/>');
        $('#seeToDos').append($tr);
    }
}

function deleteClicked() {
    var todoId = $(this).data('id');
    console.log('Delete todo with id', todoId);
    $.ajax({
        method: 'DELETE', 
        url: '/todo/' + todoId,
    }).done(function (response){
        refreshToDos();
    }).fail(function (error){
        console.log('something went wrong', error);
    })
}

function completeClicked() {
    var todoId = $(this).data('id');
    $.ajax({
        method: 'PUT', 
        url: '/todo/' + todoId,
    }).done(function(response){
        console.log(response);
        refreshToDos();
        changeCompleted(todoId);
    }).fail(function(error){
        console.log('Did not complete correctly', error);
    });
}

    function changeCompleted(todoId) {
        console.log(todoId);
        
        
        // if ( todoComplete === true) {
        //     console.log('true');
        // }
        // else {
        //     console.log('false');
        }
        

    
 



