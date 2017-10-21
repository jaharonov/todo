console.log('js ready');
$(document).ready(readyNow);

function readyNow() {
    console.log('ready!');
$('form').on('submit', function (event) {
    event.preventDefault();
    submitTask();
});

}

function submitTask() {
    var toDoItem = $('#toDoIn').val();
    var noteText = $('#noteIn').val();
    console.log('task:', toDoItem);
    console.log('note:', noteText);
    var objectToSend = {
        task: toDoItem,
        notes: noteText,
        
    }
    $('#toDoIn').val('');
    $('#noteIn').val('');
  saveToDo(objectToSend);
}

function saveToDo(objectToSend) {
$.ajax({
    type: 'POST',
    url: '/todo',
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
        var $tr = $('<tr></tr>');
        $tr.data('To Do:', todo);
        $tr.append('<td>' + todo.task + '</td>');
        $tr.append('<td>' + todo.notes + '</td>');
        $tr.append('<td><button class="deleteButton" class="btn btn-danger" data-id="' + todo.id + '">Delete</button></td>');

        
        $('#seeToDos').append($tr);
    }
}

