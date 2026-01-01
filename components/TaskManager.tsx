
import React, { useState } from 'react';
import { Task } from '../types';
import { Plus, ListTodo, Calendar, AlertCircle, CheckCircle2, MoreVertical, Brain } from 'lucide-react';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', name: 'Analyze Quantum Theory PDF', priority: 'High', status: 'Todo', productivityScore: 45, deadline: 'Today 5:00 PM' },
    { id: '2', name: 'Reflex Drills: Level 4', priority: 'Medium', status: 'Doing', productivityScore: 20, deadline: 'Today 7:00 PM' },
    { id: '3', name: 'Weekly Mind Report Export', priority: 'Low', status: 'Todo', productivityScore: 10, deadline: 'Tomorrow' },
  ]);

  const [newTaskName, setNewTaskName] = useState('');

  const addTask = () => {
    if (!newTaskName.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      name: newTaskName,
      priority: 'Medium',
      status: 'Todo',
      productivityScore: 15,
      deadline: 'Pending Analysis'
    };
    setTasks([newTask, ...tasks]);
    setNewTaskName('');
  };

  const toggleStatus = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, status: t.status === 'Done' ? 'Todo' : 'Done' } : t
    ));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Smart Task Matrix</h1>
          <p className="text-gray-400">Tasks auto-prioritized by current cognitive availability.</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-xl flex items-center gap-2">
          <Brain className="text-emerald-400 w-4 h-4" />
          <span className="text-emerald-400 text-sm font-bold">Focus Peak: 2:00 PM - 4:00 PM</span>
        </div>
      </header>

      <div className="bg-gray-900/60 p-2 rounded-2xl border border-gray-800 shadow-xl flex gap-2">
        <input 
          type="text" 
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="New cognitive goal..." 
          className="flex-1 bg-transparent border-none px-4 py-3 outline-none text-gray-100 font-medium"
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button 
          onClick={addTask}
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl text-white font-bold transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Task
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className={`group bg-gray-900 border ${task.status === 'Done' ? 'border-gray-800 opacity-60' : 'border-gray-800 hover:border-gray-700'} p-4 rounded-2xl transition-all flex items-center gap-4`}
          >
            <button 
              onClick={() => toggleStatus(task.id)}
              className={`p-1 rounded-full transition-colors ${task.status === 'Done' ? 'text-indigo-400' : 'text-gray-600 hover:text-indigo-400'}`}
            >
              <CheckCircle2 className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h3 className={`font-semibold ${task.status === 'Done' ? 'line-through text-gray-500' : 'text-gray-100'}`}>{task.name}</h3>
              <div className="flex items-center gap-4 mt-1">
                <span className={`text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 ${
                  task.priority === 'High' ? 'text-red-400' : task.priority === 'Medium' ? 'text-amber-400' : 'text-blue-400'
                }`}>
                  <AlertCircle className="w-3 h-3" /> {task.priority} Priority
                </span>
                <span className="text-[10px] text-gray-500 flex items-center gap-1 uppercase font-bold tracking-wider">
                  <Calendar className="w-3 h-3" /> {task.deadline}
                </span>
              </div>
            </div>
            <div className="hidden md:flex flex-col items-end px-4 border-r border-gray-800">
              <span className="text-[10px] text-gray-500 uppercase font-black">Prod Points</span>
              <span className="text-xl font-black text-indigo-400">+{task.productivityScore}</span>
            </div>
            <button className="text-gray-600 hover:text-white p-2">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
