const CodeModel = require('./model');
const utility = require('../../helper/utility');

module.exports = {
  getDetail: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.error('missing require fields!!');
      }

      const code = await CodeModel.findById(id);
      if (!code || !code._id) {
        return res.error('missing require fields!!');
      }
      handleUserBeforeResponse(code);
      return res.success(code);
    }catch (e) {
      console.log('catch ERR: ', e);
      return res.error(e, 500);
    }
  },
  getList: async (req, res) => {
    try {
      const query = req.query;
      const option = utility.buildOptionByQuery(query);

      const [codes, total] = await Promise.all([
        CodeModel.find({}).sort({ createdAt: -1}).limit(option.limit).skip(option.offset),
        CodeModel.count({})
      ]);

      return res.success({codes, total, page: option.page, limit: option.limit});
    }catch (e) {
      console.log('catch ERR: ', e);
      return res.error(e, 500);
    }
  },
  create: async (req, res) => {
    try {
      const body = req.body;
      const value = utility.stringValidate(body.value);
      const expired = utility.getValidDate(body.expired);
      const description = utility.stringValidate(body.description);
      const data = {
        value: value,
        expired: expired,
        description: description,
      };
      const code = await CodeModel.create(data);
      if (!code) {
        return res.error(`create code fail!.`)
      }

      return res.success(code);
    } catch (e) {
      console.log('catch ERR: ', e);
      return res.error(e, 500);
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const value = utility.stringValidate(body.value);
      const expired = utility.getValidDate(body.expired);
      const description = utility.stringValidate(body.description);

      if (!id) {
        return res.error(`missing require field.`)
      }

      let code = await CodeModel.findById(id);
      if (!code || !code._id) {
        return res.error(`code don't exist!`);
      }
      code.value = value;
      code.expired = expired;
      code.description = description;

      await code.save();

      return res.success(code);
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
      let code = await CodeModel.findById(id);
      if (!code || !code._id) {
        return res.error(`code don't exist!`);
      }

      await code.remove({_id: id});

      return res.success('Delete code success.');
    } catch (e) {
      console.log('catch ERR: ', e);
      return res.error(e, 500);
    }
  },
};

let handleUserBeforeResponse = (code) => {
  code.createdAt = undefined;
  code.__v = undefined;
};
