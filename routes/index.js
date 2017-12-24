/**
 * Created by sazack on 8/10/17.
 */

//contains API routes for your project

const express  = require('express')
let router = express.Router();
let user = require('../controllers/user.controller');
const mw = require('../middlewares/response.middleware');

router.post('/add',user.collectForUsers,user.create,mw.respond,mw.error);
//router.post('/add',user.create);
router.get('/get',user.get,mw.respond,mw.error);
router.post('/update',user.update,mw.respond,mw.error);
router.delete('/delete',user.delete,mw.respond,mw.error);
router.get('/getUndeleted',user.getUndeleted,mw.respond,mw.error);
router.get('/getUserByName',user.getUserByName,mw.respond,mw.error);
router.get('/:id',user.getUserById,mw.respond,mw.error);

module.exports = router

