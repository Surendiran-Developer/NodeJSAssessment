router.get('/tasks', async (req: Request, res: Response) => {
    const { status } = req.query;
    let tasks;
  
    if (status === 'completed') tasks = await Task.findAll({ where: { completed: true } });
    else if (status === 'pending') tasks = await Task.findAll({ where: { completed: false } });
    else tasks = await Task.findAll();
  
    res.json(tasks);
  });
  