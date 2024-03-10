class Task {
    constructor(id, title, completed) {
      this.id = id;
      this.title = title;
      this.completed = completed;
    }
}

class TaskManager{

    constructor(){
        this.tasks = [];
    }

    createTask(title, completed) {
        const id = this.tasks.length + 1;
        const task = new Task(id, title, completed);
        this.tasks.push(task);
        return task;
    }

    getTasks() {
        return this.tasks;
    }

    getTaskById(id) {
        return this.tasks.find(task => task.id === id);
    }

    getTaskByTitle(title) {
        return this.tasks.find(task => task.title === title);
    }

    updateTask(id, title, completed) {
        const task = this.getTaskById(id);
        if (task) {
          task.title = title;
          task.completed = completed;
          return task;
        }
        return null;
    }

    updateStatusTask(id,completed){
        const task = this.getTaskById(id);
        if (task) {
            task.completed = completed;
            return task;
          }
          return null;
    }

    deleteTask(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
          this.tasks.splice(index, 1);
          return true;
        }
        return false;
    }

    clearTasks() {
        this.tasks = [];
    }


}

export { Task, TaskManager };