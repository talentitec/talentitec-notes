module.exports = async (req, res, next) => {

    const authorization = process.env.AUTHORIZATION_SERVICE

    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ success: false, message: 'Falha na autenticação!' });

    const [, token] = authHeader.split(' ');

    if(!token)
        return res.status(401).json({ success: false, message: 'Falha na autenticação!' });

    if(token != authorization)
        return res.status(401).json({ success: false, message: 'Falha na autenticação!' });

    return next();
}