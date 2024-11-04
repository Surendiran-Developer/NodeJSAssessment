import express from 'express';
import authRoutes from './routes/auth';
import chatRoutes from './routes/chat';
import taskRoutes from './routes/task';
import sequelize from './db';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/tasks', taskRoutes);

sequelize.sync().then(() => {
  console.log('Database connected');
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
});
