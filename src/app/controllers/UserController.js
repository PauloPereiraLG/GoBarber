const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
    if (!req.file) {
      req.flash('error', 'Obrigatorio adicionar imagem')
      res.redirect('/signup')
    }
    const { filename: avatar } = req.file

    await User.create({ ...req.body, avatar })
      .then(() => {
        req.flash('success', 'Usuário cadastrado com sucesso')
        return res.redirect('/')
      })
      .catch(() => {
        req.flash('error', 'Erro ao cadastrar usuario')
        return res.redirect('/signup')
      })
  }
}

module.exports = new UserController()
