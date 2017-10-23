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
    
function submitTask() {
    var toDoItem = $('#toDoIn').val();
    var noteText = $('#noteIn').val();
    var completeOrNot = false;
    console.log('task:', toDoItem);
    console.log('note:', noteText);
    console.log('complete:', completeOrNot);
    var objectToSend = {
        task: toDoItem,
        notes: noteText,
        complete: completeOrNot
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
    for (var i = 0; i < todos.length; i += 1){
        var todo = todos[i];
        var $tr = $('<p></p>');
        $tr.data('To Do:', todo);
        $tr.append('<span>To do: ' + todo.task +  '  </span>');
        $tr.append('<span>Notes: ' + todo.notes +  '  </span>');
        $tr.append('<button id="deleteButton" class="delete" data-id="' + todo.id + '">Delete</button>');
        $tr.append('<button id="completeButton" class="complete" data-id="' + todo.id + '">Complete</button><br/>');
        $('#seeToDos').append($tr);
        if (todo.complete === true) {
            $tr.addClass('completed');
        }
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
        refreshToDos();
        console.log('completed');  
    }).fail(function(error){
        console.log('Did not complete correctly', error);
    });
}



    
    
        

    
 



