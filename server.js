const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let tareas = [
    { id: 1, texto: 'Definición de requisitos del sistema y SLA', completada: true },
    { id: 2, texto: 'Configuración del repositorio remoto en GitHub', completada: true },
    { id: 3, texto: 'Pruebas de latencia y Cold Start en Render', completada: false },
    { id: 4, texto: 'Auditoría de despliegue en Vercel y Railway', completada: false }
];

app.get('/api/status', (req, res) => {
    const completadas = tareas.filter(t => t.completada).length;
    res.json({
        usuario: "Paula García",
        rol: "Project Manager",
        proyecto: "Evaluación Comparativa PaaS",
        tareas: tareas,
        total: tareas.length,
        completadas: completadas,
        progreso: tareas.length > 0 ? Math.round((completadas / tareas.length) * 100) : 0,
        servidorTimestamp: new Date().toLocaleTimeString()
    });
});

app.post('/api/tasks', (req, res) => {
    const { texto } = req.body;
    if (texto) {
        const nuevaTarea = { id: Date.now(), texto, completada: false };
        tareas.push(nuevaTarea);
        return res.status(201).json(nuevaTarea);
    }
    res.status(400).json({ error: 'El texto es obligatorio' });
});

app.put('/api/tasks/:id/toggle', (req, res) => {
    const id = Number(req.params.id);
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
        return res.json(tarea);
    }
    res.status(404).json({ error: 'Tarea no encontrada' });
});

app.delete('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    tareas = tareas.filter(t => t.id !== id);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Servidor de Gestión de Proyectos ejecutándose en puerto ${PORT}`);
});