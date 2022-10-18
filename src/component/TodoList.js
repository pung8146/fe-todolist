import todo from '../data/data.json';

export default function TodoList() {
    return <ul className="list_day">
        {todo.lists.map(id => (
            <li key={id.id}>Id {id.id}</li>
        ))}
    </ul>
}