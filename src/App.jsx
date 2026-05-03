import { useState } from "react";
import {
  LayoutDashboard,
  ListTodo,
  Plus,
  Clock,
  CheckCircle,
} from "lucide-react";

function App() {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [todos, setTodos] = useState([]);

    const addTask = () => {
    if (task.trim() === "") {
      alert("Please enter task");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      deadline: deadline,
      completed: false,
      createdAt: new Date(),
    };

    setTodos([...todos, newTask]);
    setTask("");
    setDeadline("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const checkReminder = (deadline) => {
    const now = new Date();
    const taskTime = new Date(deadline);

    if (taskTime < now) {
      return "Deadline passed";
    }

    const difference = taskTime - now;
    const hoursLeft = Math.floor(difference / (1000 * 60 * 60));
    const minutesLeft = Math.floor((difference / (1000 * 60)) % 60);

    return `${hoursLeft}h ${minutesLeft}m left`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden flex">

        {/* Sidebar */}
        <div className="w-72 bg-red-400 text-white p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-8">
              Dash<span className="text-black">board</span>
            </h1>

            <div className="bg-white text-red-500 rounded-xl p-3 flex items-center gap-3 mb-4">
              <LayoutDashboard size={22} />
              <span className="font-semibold">Dashboard</span>
            </div>

            <div className="flex items-center gap-3 p-3 mb-3">
              <ListTodo size={22} />
              <span>My Task</span>
            </div>
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 bg-gray-50 p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              Welcome back 👋
            </h2>

            <p className="font-semibold text-gray-600">
              {new Date().toDateString()}
            </p>
          </div>

          {/* Add Task Box */}
          <div className="bg-white p-5 rounded-2xl shadow mb-6">
            <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
              <Plus size={20} />
              Add Task
            </h3>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter your task..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-300"
              />

              <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-300"
              />

              <button
                onClick={addTask}
                className="bg-red-400 text-white px-6 py-3 rounded-xl hover:bg-red-500"
              >
                Add
              </button>
            </div>
          </div>

          {/* Task List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow p-5">
              <h3 className="text-lg font-bold text-red-400 mb-4">
                To-Do
              </h3>

              {todos.length === 0 ? (
                <p className="text-gray-500">No tasks added yet.</p>
              ) : (
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="border rounded-2xl p-4 mb-4 bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleComplete(todo.id)}
                          className="mt-1 w-5 h-5 accent-green-500 cursor-pointer"
                        />

                        <div>
                          <h4
                            className={`font-bold ${
                              todo.completed
                                ? "line-through text-gray-400"
                                : "text-gray-800"
                            }`}
                          >
                            {todo.text}
                          </h4>

                         {todo.deadline && (
                            <>
                              <p className="text-sm text-gray-500 flex items-center gap-1 mt-2">
                                <Clock size={15} />
                                Deadline: {new Date(todo.deadline).toLocaleString()}
                              </p>

                              <p className="text-sm text-red-400 mt-1">
                                {checkReminder(todo.deadline)}
                              </p>
                            </>
                          )}

                          <p className="text-sm text-gray-400 mt-1">
                            Created: {new Date(todo.createdAt).toLocaleString()}
                          </p>

                          <p className="text-sm text-red-400 mt-1">
                            {checkReminder(todo.deadline)}
                          </p>

                          <p className="text-sm mt-1">
                            Status:{" "}
                            <span
                              className={
                                todo.completed
                                  ? "text-green-600 font-semibold"
                                  : "text-blue-600 font-semibold"
                              }
                            >
                              {todo.completed ? "Completed" : "In Progress"}
                            </span>
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => deleteTask(todo.id)}
                        className="text-red-500 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Completed Task */}
            <div className="bg-white rounded-2xl shadow p-5">
              <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                <CheckCircle size={20} />
                Completed Task
              </h3>

              {todos.filter((todo) => todo.completed).length === 0 ? (
                <p className="text-gray-500">No completed tasks.</p>
              ) : (
                todos
                  .filter((todo) => todo.completed)
                  .map((todo) => (
                    <div
                      key={todo.id}
                      className="border rounded-2xl p-4 mb-4 bg-green-50"
                    >
                      <h4 className="font-bold text-gray-700">
                        {todo.text}
                      </h4>
                      <p className="text-sm text-green-600 font-semibold">
                        Completed
                      </p>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;