let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.getElementById("addTaskBtn").addEventListener("click", addTask);

document.getElementById("filterStatus").addEventListener("change", renderTasks);

document.getElementById("filterCategory").addEventListener("input", renderTasks);

function saveTasks() {
  
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function checkOverdue() {
  const today = new Date().toISOString().split("T")[0];

  tasks.forEach(function(task) {
    
    if (task.deadline < today && task.status !== "Completed") {
      
      task.status = "Overdue";
    }
  });
}

function addTask() {
  
  const name = document.getElementById("taskName").value;
  
  const category = document.getElementById("taskCategory").value;
  
  const deadline = document.getElementById("taskDeadline").value;
  
  const status = document.getElementById("taskStatus").value;

  if (name === "" || category === "" || deadline === "") {
    alert("Please fill in all fields.");
    return;
  }

  const newTask = {
    name: name,
    category: category,
    deadline: deadline,
    status: status
  };

  
  tasks.push(newTask);
  
  saveTasks();
  
  renderTasks();

  document.getElementById("taskName").value = "";
  document.getElementById("taskCategory").value = "";
  document.getElementById("taskDeadline").value = "";
}

function updateStatus(index, newStatus) {
  
  tasks[index].status = newStatus;
  
  saveTasks();
  
  renderTasks();
}

function renderTasks() {
  
  checkOverdue();
  
  saveTasks();

  
  const taskList = document.getElementById("taskList");
  
  taskList.innerHTML = "";

  
  const statusFilter = document.getElementById("filterStatus").value;
  
  const categoryFilter = document.getElementById("filterCategory").value.toLowerCase();

  
  tasks.forEach(function(task, index) {
    
    const matchesStatus = (statusFilter === "All" || task.status === statusFilter);
    
    const matchesCategory = task.category.toLowerCase().includes(categoryFilter);

    
    if (matchesStatus && matchesCategory) {
      
      const li = document.createElement("li");

      
      li.innerHTML = `
        <strong>${task.name}</strong> | 
        Category: ${task.category} | 
        Deadline: ${task.deadline} | 
        Status: <b>${task.status}</b> 
        <select onchange="updateStatus(${index}, this.value)">
          <option value="In Progress" ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
          <option value="Completed" ${task.status === "Completed" ? "selected" : ""}>Completed</option>
          <option value="Overdue" ${task.status === "Overdue" ? "selected" : ""}>Overdue</option>
        </select>
      `;

      
      taskList.appendChild(li);
    }
  });
}

renderTasks();