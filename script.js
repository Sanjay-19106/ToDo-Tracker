function appendList() {
  var inp = document.getElementById("in");
  var things = document.getElementById("things"); // <-- required!

  if (inp.value.trim() === "") return;

  const existingTasks = Array.from(document.querySelectorAll(".task-text")).map(
    (t) => t.innerText.trim().toLowerCase()
  );
  if (existingTasks.includes(inp.value.trim().toLowerCase())) {
    alert("Task already exists!");
    return;
  }
  var line = document.createElement("div");
  line.className = "line";

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "round-checkbox";
  checkbox.onclick = function () {
    toggleStrike(this);
  };

  var span = document.createElement("span");
  span.className = "task-text";
  span.innerText = inp.value;

  var button = document.createElement("button");
  button.onclick = del;

  var icon = document.createElement("span");
  icon.className = "glyphicon glyphicon-trash";
  button.appendChild(icon);

  line.appendChild(checkbox);
  line.appendChild(span);
  line.appendChild(button);

  things.appendChild(line);

  inp.value = "";

  updateCount();
}
function del(event) {
  event.target.closest(".line").remove();
  updateCount();
}
function clearAll() {
  document.getElementById("things").innerHTML = "";
  updateCount();
}

function toggleStrike(checkbox) {
  const parent = checkbox.parentElement;
  const taskText = parent.querySelector(".task-text");

  if (checkbox.checked) {
    parent.style.textDecoration = "line-through";
    taskText.style.color = "black";
  } else {
    parent.style.textDecoration = "none";
    taskText.style.color = "white";
  }

  updateCount();
}
function updateCount() {
  const total = document.querySelectorAll(".round-checkbox").length;
  const checked = document.querySelectorAll(".round-checkbox:checked").length;
  document.getElementById("count").innerText = `${checked} / ${total}`;
  document.getElementById("prog").value =
    total === 0 ? 0 : (checked / total) * 100;

  if (checked == total && total !== 0) {
    alert("Congrats!! You have Completed all Your Tasks!!");
  }
}
document.getElementById("in").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    appendList();
  }
});
