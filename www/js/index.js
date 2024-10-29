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

function addTask() {
    $("#dialog").dialog("open");
}

function removeTask() {
    var taskDiv = $(this).parent();
    var taskTitle = taskDiv.prev();
    taskTitle.remove();
    taskDiv.remove();
    $("#accordion").accordion("refresh");
}

function editTaskOk() {
    console.log("Hola, estoy en editTaskOk");
}

function editTask() {
    var taskDiv = $(this).parent();
    var taskTitle = taskDiv.prev();
    var taskTitleText = taskTitle.text();
    var newInputText = $("<input type='text' class='taskEditInput' value='" + taskTitleText + "' />\n"
        + "<button class='btn_EditTaskOk'>Ok</button>\n"
    );
    $(".btn_EditTaskOk", newInputText).click(editTaskOk);
    taskDiv.empty();
    taskDiv.append(newInputText);
    console.log("ediTask final");

}

$(document).ready(function () {
    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Afegir": function () {
                var taskName = $("#taskName").val();
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

                $(this).dialog("close");
            },
            "Cancelar": function () {
                $("#taskName").val("");
                $(this).dialog("close");
            }
        }
    });

    $("#btn_addTask").click(addTask);
    $(".btn_EditTask").click(editTask);
    $(".btn_RemoveTask").click(removeTask);
    $(".btn_EditTaskOk").click(editTaskOk);
});