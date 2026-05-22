import app from './api/server';

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Second‑Brain listening on ${PORT}`));