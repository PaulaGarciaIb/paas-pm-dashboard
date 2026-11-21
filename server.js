const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let tareas = [
    { id: 1, texto: 'Configurar repositorio en GitHub', completada: true },
    { id: 2, texto: 'Evaluar despliegue en Render, Railway y Vercel', completada: false }
];

app.get('/api/status', (req, res) => {
    const completadas = tareas.filter(t => t.completada).length;
    res.json({
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
    res.status(400).json({ error: 'El texto de la tarea es obligatorio' });
});

app.listen(PORT, () => {
    console.log(`Servidor de Gestión de Proyectos en puerto ${PORT}`);
});