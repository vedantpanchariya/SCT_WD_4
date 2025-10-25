let todos = [];

export const addTodo = (todo)=>{
    todos.push(todo);
};

export const deleteTodo = (id) => {
    const index = todos.findIndex(t => t.id == id);
    if(index !== -1){
        todos.splice(index,1);
    }
};

export const toggleComplete = (id) => {
    const todo = todos.find(t => t.id == id);
    if(todo){
        todo.completed = !todo.completed;
    }
    
}

export const filterTodo = (filter) =>{

    if(filter === "All") return todos;

    const today = new Date();
    today.setHours(0,0,0,0);

    return todos.filter(todo => {
        const dueDate = new Date(todo.dueDate);
        dueDate.setHours(0,0,0,0);      

        if(filter == "Today"){
            return dueDate.getTime() === today.getTime();
        }

        if(filter == "Week"){
            // Get the start of the week (Sunday or Monday, depending on your preference)
            const startOfWeek = new Date(today);
            const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
                
            // Set to Monday (start of week)
            startOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
            startOfWeek.setHours(0, 0, 0, 0);
                
            // Set to Sunday (end of week)
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);
                
            return dueDate >= startOfWeek && dueDate <= endOfWeek;
        }

        if(filter == "Month"){
            return dueDate.getMonth() === today.getMonth() && 
            dueDate.getFullYear() === today.getFullYear();
        }

        return false;

    });
}

