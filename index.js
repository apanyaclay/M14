import express from 'express';
import session from 'express-session';
import user_routes from './routers/user.js';
import admin_product_routes from './routers/admin/product.js';
import admin_supplier_routes from './routers/admin/supplier.js';
import User from './models/user.js';

const app = express();
const hostname = 'localhost';
const port = 3003;

app.use(session({
    secret: 'ini adalah kode secret###', 
    resave: false, 
    saveUninitialized: true, 
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
    })
);

app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.use('/user', user_routes);
app.use('/admin/product', admin_product_routes);
app.use('/admin/supplier', admin_supplier_routes);


app.get('/', (req, res) => {
    res.render('index', { user:req.session.user || "" });
})

app.get('/create-db', (req, res) => {
    User.sync({ force: true });
    res.send('create db');
})

app.get('/forbidden', (req, res) => {
    res.render('forbidden', { user:req.session.user || "" });
})

app.get('*', (req, res) => {
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Server running at ${hostname}:${port}`);
})