document.addEventListener('DOMContentLoaded', () => {
    // Load existing data from local storage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    renderTodos(todos);
  });
  
  function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();
  
    if (todoText === '') return;
  
    const todo = {
      id: uuidv4(),
      text: todoText,
    };
  
    const todos = getTodosFromLocalStorage();
    todos.push(todo);
    updateLocalStorage(todos);
    renderTodos(todos);
  
    todoInput.value = '';
  }
  
  function updateTodo() {
    const todoInput = document.getElementById('todoInput');
    const updateBtn = document.getElementById('updateBtn');
    const addBtn = document.getElementById('addBtn');
  
    const todoText = todoInput.value.trim();
    const todoId = updateBtn.dataset.id;
  
    if (todoText === '') return;
  
    const todos = getTodosFromLocalStorage();
    const updatedTodos = todos.map(todo => (todo.id === todoId ? { ...todo, text: todoText } : todo));
  
    updateLocalStorage(updatedTodos);
    renderTodos(updatedTodos);
  
    todoInput.value = '';
    updateBtn.classList.add('hidden');
  
    // Show the Add Todo button
    addBtn.classList.remove('hidden');
  }
  
  
  function deleteTodo(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const todos = getTodosFromLocalStorage().filter(todo => todo.id !== id);
        updateLocalStorage(todos);
        renderTodos(todos);
        Swal.fire('Deleted!', 'Your todo has been deleted.', 'success');
      }
    });
  }

  function editTodo(id) {
    const todo = getTodosFromLocalStorage().find(todo => todo.id === id);
    const todoInput = document.getElementById('todoInput');
    const updateBtn = document.getElementById('updateBtn');
    const addBtn = document.getElementById('addBtn');
  
    todoInput.value = todo.text;
    updateBtn.classList.remove('hidden');
    updateBtn.dataset.id = id;
  
    // Hide the Add Todo button
    addBtn.classList.add('hidden');
  }
  
  
  function renderTodos(todos) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
  
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = 'flex items-center justify-between bg-white p-2 rounded-md shadow todo hover:bg-gray-100';
  
      li.innerHTML = `
        <span>${todo.text}</span>
        <div class="flex items-center space-x-2 todo-icons opacity-0 transition-opacity duration-200">
          <button onclick="editTodo('${todo.id}')" class="hover:text-blue-500 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
           <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>        
          </button>
          <button onclick="deleteTodo('${todo.id}')" class="hover:text-red-500 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
           <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>        
         </button>
        </div>
      `;
      todoList.appendChild(li);
    });
  }
  
  function getTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem('todos')) || [];
  }
  
  function updateLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  
  // Function to UUID generation
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  