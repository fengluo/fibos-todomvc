// create 似乎是个关键词
exports.emplace = (id, text, completed) => {
    var todos = db.todos(action.account, action.account);
    todos.emplace(action.account, {
        text,
        completed,
        id
    });
    console.log('todo#', id, ' created');
}
exports.find = (id) => {
    var todos = db.todos(action.account, action.account);
    console.log(todos.get(id))
};
exports.update = (id, text, completed) => {
    var todos = db.todos(action.account, action.account);
    todos.modify(
        id,
        action.account,
        {
            text,
            completed,
            id
        }
    );
    console.log('todos#', id, ' updated');
}
exports.destory = (id) => {
    var todos = db.todos(action.account, action.account);
    todos.erase(id);
    console.log('todos#', id, ' removed');
}