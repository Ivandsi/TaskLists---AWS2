// /*
//  * Licensed to the Apache Software Foundation (ASF) under one
//  * or more contributor license agreements.  See the NOTICE file
//  * distributed with this work for additional information
//  * regarding copyright ownership.  The ASF licenses this file
//  * to you under the Apache License, Version 2.0 (the
//  * "License"); you may not use this file except in compliance
//  * with the License.  You may obtain a copy of the License at
//  *
//  * http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing,
//  * software distributed under the License is distributed on an
//  * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
//  * KIND, either express or implied.  See the License for the
//  * specific language governing permissions and limitations
//  * under the License.
//  */

// // Wait for the deviceready event before using any of Cordova's device APIs.
// // See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
// document.addEventListener('deviceready', onDeviceReady, false);

// function onDeviceReady() {
//     // Cordova is now initialized. Have fun!

//     console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
//     document.getElementById('deviceready').classList.add('ready');
// }

$(function () {
    $("#accordion").accordion();
});

function addTaskToStorage(task) {
    let tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromStorage(task) {
    if (task != "") {
        let tasks = getTasksFromStorage();
        let index = tasks.indexOf(task);
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function updateTaskFromStorage(originalTask, newTaskName) {
    if (originalTask != "" && newTaskName != "") {
        if (originalTask != newTaskName) {
            let tasks = getTasksFromStorage();
            let index = tasks.indexOf(originalTask);
            tasks[index] = newTaskName;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
}

function getTasksFromStorage() {
    let tasksString = localStorage.getItem("tasks");
    let tasks;
    if (tasksString == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(tasksString);
    }
    return tasks;
}

function addTask() {
    $("#dialog").dialog("open");
}

function removeTask() {
    var taskDiv = $(this).parent();
    var taskTitle = taskDiv.prev();
    taskTitle.remove();
    taskDiv.remove();
    $("#accordion").accordion("refresh");
    removeTaskFromStorage(taskTitle.text());
}

function editTaskOk() {
    var taskInputVal = $(this).prev().val();
    if (taskInputVal != "") {
        var taskDiv = $(this).parent();
        var taskTitle = taskDiv.prev();
        let originalTaskTitle = taskTitle.text();
        let tasks = getTasksFromStorage();
        if (!tasks.includes(taskInputVal) || taskInputVal == originalTaskTitle) {
            taskTitle.text(taskInputVal);
            var newTaskElement = $("    <button class='btn_EditTask'>Edita</button>\n" +
                "    <button class='btn_RemoveTask'>X</button>");
            // l'afegim a una llista de la nostra pàgina
            taskDiv.html(newTaskElement);
            $(".btn_EditTask", taskDiv).click(editTask);
            $(".btn_RemoveTask", taskDiv).click(removeTask);
            $("#accordion").accordion("refresh");
            updateTaskFromStorage(originalTaskTitle, taskInputVal);
        } else {
            alert("La tasca ja existeix");
        }
    } else {
        alert("Entra un nom de tasca");
    }
}

function editTask() {
    var taskDiv = $(this).parent();
    var taskTitle = taskDiv.prev();
    var taskTitleText = taskTitle.text();
    var newInputText = $("<input type='text' class='taskEditInput' value='" + taskTitleText + "' />\n"
        + "<button class='btn_EditTaskOk'>Ok</button>\n"
    );
    taskDiv.html(newInputText);
    $(".btn_EditTaskOk", taskDiv).click(editTaskOk);

}

$(document).ready(function () {
    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Afegir": function () {
                var taskName = $("#taskName").val();
                if (taskName != "") {
                    if (!getTasksFromStorage().includes(taskName)) {
                        // creem element jQuery
                        var newTaskElement = $("<h3>" + taskName + "</h3>\n" +
                            "<div>\n" + "    <button class='btn_EditTask'>Edita</button>\n" +
                            "    <button class='btn_RemoveTask'>X</button>\n" + "</div>");

                        // l'afegim a una llista de la nostra pàgina
                        $(".btn_EditTask", newTaskElement).click(editTask);
                        $(".btn_RemoveTask", newTaskElement).click(removeTask);
                        $("#accordion").append(newTaskElement);
                        $("#accordion").accordion("refresh");
                        $("#taskName").val("");
                        addTaskToStorage(taskName);

                        $(this).dialog("close");
                    } else {
                        alert("La tasca ja existeix");
                    }
                } else {
                    alert("Entra un nom de tasca");
                }
            },
            "Cancelar": function () {
                $("#taskName").val("");
                $(this).dialog("close");
            }
        }
    });

    getTasksFromStorage().forEach(function (task) {
        var newTaskElement = $("<h3>" + task + "</h3>\n" +
            "<div>\n" + "    <button class='btn_EditTask'>Edita</button>\n" +
            "    <button class='btn_RemoveTask'>X</button>\n" + "</div>");
        // l'afegim a una llista de la nostra pàgina
        $(".btn_EditTask", newTaskElement).click(editTask);
        $(".btn_RemoveTask", newTaskElement).click(removeTask);
        $("#accordion").append(newTaskElement);
        $("#accordion").accordion("refresh");
    });

    $("#btn_addTask").click(addTask);
    $(".btn_EditTask").click(editTask);
    $(".btn_RemoveTask").click(removeTask);
    $(".btn_EditTaskOk").click(editTaskOk);
});