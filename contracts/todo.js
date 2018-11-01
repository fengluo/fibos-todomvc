// create 似乎是个关键词
exports.emplacetodo = (id, text, completed) => {
    var todos = db.todos(action.account, action.account);
    todos.emplace(action.account, {
        text,
        completed,
        id
    });
    console.log('todo#', id, ' created');
}
exports.findtodo = (id) => {
    var todos = db.todos(action.account, action.account);
    console.log(todos.find(id))
};
exports.updatetodo = (id, text, completed) => {
    var todos = db.todos(action.account, action.account);
    var itr = todos.find(id);
    itr.data.text = text;
    itr.data.completed = completed;
    itr.update(action.account);
    console.log('todos#', id, ' updated');
}
exports.destorytodo = (id) => {
    var todos = db.todos(action.account, action.account);
    var itr = todos.find(id);
    itr.remove();
    console.log('todos#', id, ' removed');
}