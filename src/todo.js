export function createTask(title,description,dueDate,completed,createdAt){
    return{
        id : Date.now() + Math.random(),
        title,
        description,
        dueDate,
        completed : false,
        createdAt : new Date().toLocaleString()
    };
}