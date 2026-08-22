const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const BUILD_DIR = path.join(__dirname, 'build');

app.use(express.static(BUILD_DIR));

// SPA fallback: any route not matched by a static file returns index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(BUILD_DIR, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});