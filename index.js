const express = require('express');
const { engine } = require(`express-handlebars`);
const path = require('path');
const products = require(`./models/productsApi`);

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Template engines
app.engine(`hbs`, engine({
  extname: `hbs`,
  defaultLayout: `index.hbs`,
  layoutsDir: path.resolve(__dirname, `./views/hbs`),
  partialsDir: path.resolve(__dirname, `./views/hbs/partials`)
}));
app.set(`views`, `./views`);
app.set(`view engine`, `hbs`); // cambiar HBS por PUG o EJS.

// --- Descomentar si se desea usar EJS ↓ ---
// app.get(`/`, (req, res) => {
//   res.render(`ejs/index`, { form: true, history: false });
// })
// app.get(`/productos`, (req, res) => {
//   res.render(`ejs/index`, { form: false, history: true, products: products.getAll() });
// })

// --- Descomentar si se desea usar PUG ↓ ---
// app.get(`/`, (req, res) => {
//   res.render(`pug/index`, { form: true });
// })
// app.get(`/productos`, (req, res) => {
//   res.render(`pug/index`, { history: true, products: products.getAll() });
// })

// --- Comentar si se desea cambiar de plantilla ↓ ---
app.get(`/`, (req, res) => {
  res.render(`hbs/layouts/main`, { form: true });
})
app.get(`/productos`, (req, res) => {
  res.render(`hbs/layouts/main`, { history: true, products: products.getAll(), pLength: products.getAll().length>0 });
})

// --- No comentar ↓ ---
app.post(`/productos`, (req, res) => {
  products.saveProduct(req.body);
  res.redirect(`/`);
})

const connectedServer = app.listen(PORT, () => console.log(`Servidor activo y escuchando en el puerto ${PORT}`));
connectedServer.on('error', (error) => console.log(error.message));