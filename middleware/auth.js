const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('Authorization');
  if(!token)
    return res.status(401).json({ message: 'Sem token fornecido.'});

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido.' });
  }
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acesso negado'});
    }
    next();
  }
}

module.exports = { auth, authorizeRoles };