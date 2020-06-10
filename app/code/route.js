let controller = require('./controller');

module.exports = (route)=>{
  route.get('/code/:id', controller.getDetail);
  route.get('/code', controller.getList);
  route.post('/code', controller.create);
  route.put('/code/:id', controller.update);
  route.delete('/code/:id', controller.delete);
};
