const GameModel = require('./model');
const utility = require('../../helper/utility');

module.exports = {
  getDetail: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.error('missing require fields!!');
      }

      const game = await GameModel.findById(id);
      if (!game || !game._id) {
        return res.error('missing require fields!!');
      }
      handleUserBeforeResponse(game);
      return res.success(game);
    }catch (e) {
      console.log('catch ERR: ', e);
      return res.error(e, 500);
    }
  },
  getList: async (req, res) => {
    try {
      const query = req.query;
      const option = utility.buildOptionByQuery(query);

      const [games, total] = await Promise.all([
        GameModel.find({}).sort({ createdAt: -1}).limit(option.limit).skip(option.offset),
        GameModel.count({})
      ]);

      return res.success({ games, total, page: option.page, limit: option.limit });
    }catch (e) {
      console.log('catch ERR: ', e);
      return res.error(e, 500);
    }
  },
  create: async (req, res) => {
    try {
      const body = req.body;
      const name = utility.stringValidate(body.name);
      const userId = utility.arrayValidate(body.userId);
      const codeId = utility.arrayValidate(body.code);
      const data = {
        name: name,
        userId: userId,
        codeId: codeId,
      };
      const game = await GameModel.create(data);
      if (!game) {
        return res.error(`create game fail!.`)
      }

      return res.success(game);
    } catch (e) {
      console.log('catch ERR: ', e);
      return res.error(e, 500);
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const name = utility.stringValidate(body.name);
      const userId = utility.arrayValidate(body.userId);
      const codeId = utility.arrayValidate(body.code);

      if (!id) {
        return res.error(`missing require field.`)
      }

      let game = await GameModel.findById(id);
      if (!game || !game._id) {
        return res.error(`game don't exist!`);
      }
      game.name = name;
      game.userId = userId;
      game.code = codeId;

      await game.save();

      return res.success(game);
    } catch (e) {
      console.log('catch ERR: ', e);
      return res.error(e, 500);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.error(`missing require field.`)
      }
      let game = await GameModel.findById(id);
      if (!game || !game._id) {
        return res.error(`game don't exist!`);
      }

      await game.remove({_id: id});

      return res.success('Delete game success.');
    } catch (e) {
      console.log('catch ERR: ', e);
      return res.error(e, 500);
    }
  },
};

let handleUserBeforeResponse = (game) => {
  game.password = undefined;
  game.createdAt = undefined;
  game.updatedAt = undefined;
  game.__v = undefined;
};
