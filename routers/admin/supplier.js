import express from 'express';
import Supplier from '../../models/supplier.js';
import forAdmin from '../../controllers/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
    Supplier.findAll().then((results) => {
        res.render('admin/supplier/index', { suppliers: results, user:req.session.user||""  });
    });
})

router.get('/create-supplier', (req, res) => {
    res.render('admin/supplier/create', { user: req.session.user || "" });
})

router.get('/edit-supplier/:id', forAdmin, (req, res) => {
    Supplier.findOne({ where: { id: req.params.id } }
    ).then((results) => {
        res.render('admin/supplier/edit', { supplier: results });
    })
})

router.post('/api/suppliers', forAdmin, (req, res) => {
    Supplier.create({ company_name: req.body.company_name, contact_name: req.body.contact_name, email: req.body.email, phone: req.body.phone, active: req.body.active, createdBy: req.session.user.username }
    ).then((results) => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 502, error: err });
    })
})

router.put('/api/supplier/:id', forAdmin, (req, res) => {
    Supplier.update({ company_name: req.body.company_name, contact_name: req.body.contact_name, email: req.body.email, phone: req.body.phone, active: req.body.active, updatedBy: req.session.user.username }, { where: { id: req.params.id } }
    ).then((results) => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 502, error: err });
    })
})

router.delete('/api/supplier/:id', forAdmin, (req, res) => {
    Supplier.destroy({ where: { id: req.params.id } }
    ).then(() => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 500, error: err, Response: {} });
    })
})

export default router;
