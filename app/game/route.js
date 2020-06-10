let controller = require('./controller');

module.exports = (route)=>{
  route.get('/game/:id', controller.getDetail);
  route.get('/game', controller.getList);
  route.post('/game', controller.create);
  route.put('/game/:id', controller.update);
  route.delete('/game/:id', controller.delete);
};
