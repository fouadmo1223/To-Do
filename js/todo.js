// intialize array to put in local storage
let arrayOfTasks = [];
// add tasks to local storage
function addTaskToLocalStorage(obj) {
  arrayOfTasks = JSON.parse(localStorage.getItem("data"));
  arrayOfTasks.push(obj);
  localStorage.setItem("data", JSON.stringify(arrayOfTasks));
}
// edit the task checkboxes
function editCheck(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      if (arrayOfTasks[i].check) {
        arrayOfTasks[i].check = false;
      } else {
        arrayOfTasks[i].check = true;
      }
    }
  }
  localStorage.setItem("data", JSON.stringify(arrayOfTasks));
}
// remove tasks from local storage using task id
function removeTask(taskId, button) {
  // select the div to remove
  $(button).parent().parent().remove();
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  console.log(arrayOfTasks);
  localStorage.setItem("data", JSON.stringify(arrayOfTasks));
}
// add task to body if add task is clicked on
function addTaskToTableFRomAdd(value) {
  // make object to push in array of tasks
  let obj = {
    id: Date.now(),
    check: false,
    val: value,
  };
  // check the length of task before adding it
  if (value.length <= 3) {
    swal("Task length must be at least 3 char", "", "error").then(function () {
      $(".input").val("");
      alertify.notify(
        "Task length must be at least 3 char",
        "error",
        2,
        function () {}
      );
    });
  } else {
    $(".input").val("");
    swal("Task is added", "", "success").then(function () {
      $(".input").val("");
      alertify.notify("Task is added", "success", 2, function () {});
    });
    $(".row")
      .append(`<div class="task  col-12 col-lg-6 d-flex align-center justify-content-between">
      <div id="checklist" class="">
        <input value="${value}"   data-id="${
      obj.id // to use it to select the removed task
    }"  name="r" type="checkbox" id="${value}" />
        <label class="ml-20" title="${value}" for="${value}">${value.slice(
      0,
      14
    )}</label>
      </div>
      <div>
        <button  data-id="${
          obj.id // to use it to select the removed task
        }" class=" delete hvr-buzz" data-text="Delete">Delete</button>
      </div>
    </div>`);
    $(".delete").click(function () {
      // get the id of task from delete to delete it from arrayof tasks in local storage
      let id = $(this).attr("data-id");
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this task!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          removeTask(id, $(this));
          swal("Poof! Your task has been deleted!", {
            icon: "success",
          }).then(() => {
            alertify.notify("Task is deleted", "error", 2, function () {});
          });
        } else {
          swal("Your task is safe!", {
            icon: "error",
          }).then(() => {
            alertify.notify("Task is safe", "error", 2, function () {});
          });
        }
      });
    });
    $("input[type='checkbox']").click(function () {
      let id = $(this).attr("data-id");
      editCheck(id);
    });

    addTaskToLocalStorage(obj);
  }
}
function addTaskToTableFRomlocal(arrayOfTasks) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    $(".row")
      .append(`<div class="task  col-12 col-lg-6 d-flex align-center justify-content-between">
    <div id="checklist" class="">
      <input ${arrayOfTasks[i].check ? "checked" : ""} value="${
      arrayOfTasks[i].val
    }" data-id="${
      arrayOfTasks[i].id // to use it to select the removed task
    }" name="r" type="checkbox" id="${arrayOfTasks[i].val}" />
      <label class="ml-20" title="${arrayOfTasks[i].val}" for="${
      arrayOfTasks[i].val
    }">${arrayOfTasks[i].val.slice(0, 14)}</label>
    </div>
    <div>
      <button  class=" delete hvr-buzz" data-id="${
        arrayOfTasks[i].id // to use it to select the removed task
      }" data-text="Delete">Delete</button>
    </div>
  </div>`);
  }
}
// check if local storage is empty or not as not to reset tge values
if (localStorage.getItem("data") == null) {
  localStorage.setItem("data", JSON.stringify(arrayOfTasks));
} else {
  arrayOfTasks = JSON.parse(localStorage.getItem("data"));
  addTaskToTableFRomlocal(arrayOfTasks);
}
$(".fancy").click(function () {
  let button = $(this);
  $(this).addClass("disabled");
  let value = $(".input").val();
  addTaskToTableFRomAdd(value);
});
// when click enter add the taske
$(".input").keypress(function (event) {
  console.log(event.key);
  if (event.key == "Enter") {
    let value = $(".input").val();
    addTaskToTableFRomAdd(value);
  }
});

$(".delete").click(function () {
  let id = $(this).attr("data-id");
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this task!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      removeTask(id, $(this));
      swal("Poof! Your task has been deleted!", {
        icon: "success",
      }).then(() => {
        alertify.notify("Task is deleted", "error", 2, function () {});
      });
    } else {
      swal("Your task is safe!", {
        icon: "error",
      }).then(() => {
        alertify.notify("Task is safe", "error", 2, function () {});
      });
    }
  });
});

$("input[type='checkbox']").click(function () {
  // console.log($(this).attr("data-id"));
  // console.log(arrayOfTasks);
  let id = $(this).attr("data-id");
  editCheck(id);
});
