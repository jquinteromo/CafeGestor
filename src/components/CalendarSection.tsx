// src/components/CalendarSection.tsx

import { useState } from "react";
interface Task {
  date: string;
  action: string;
}

export const CalendarSection = () => {
  const [taskDate, setTaskDate] = useState("");
  const [action, setAction] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (!taskDate || !action) return;
    setTasks([...tasks, { date: taskDate, action }]);
    setTaskDate("");
    setAction("");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Calendario Agrícola
      </h2>

      <div className="flex flex-col gap-3 mb-4">
        <input
          type="date"
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Acción realizada o pendiente (ej: Aboné, Fumigar...)"
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
        >
          Guardar tarea
        </button>
      </div>

      <ul className="space-y-2 max-h-48 overflow-y-auto">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="bg-green-50 border border-green-200 p-2 rounded-lg text-sm text-green-800"
          >
            📅 <strong>{task.date}</strong>: {task.action}
          </li>
        ))}
        {tasks.length === 0 && (
          <p className="text-sm text-gray-400">No hay tareas registradas.</p>
        )}
      </ul>
    </div>
  );
};
