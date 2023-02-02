module.exports = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    else if (req.user) {
      next();
    } else {
      res.redirect('/login')
    }
  }
    
