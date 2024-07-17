const auth = require('../config/auth');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const axios = require('axios');

module.exports = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ message: 'Falha na autenticação!' });

    const [, authJWT] = authHeader.split(' ');

    try {
        const body = { token: authJWT };
        const headers = { Authorization: "Basic " + process.env.AUTHORIZATION_SERVICE };
        const url = process.env.URL_SERVICE_VALIDATION;
        const response = await axios.post(url, body, { headers });

        if(!response)
            return res.status(401).json({ success: false, message: 'Falha na autenticação!' });

        if(!response.data.success)
            return res.status(401).json({ success: false, message: response.data.message });

        const decoded = await promisify(jwt.verify)(authJWT, auth.secret);

        req.user_id = decoded.user_id;
        req.company_id = decoded.company_id;
        
    } catch (error) {
        console.log(`Erro: ${error}`);
        return res.status(401).json({ success: false, message: 'Falha na autenticação!' });
    }

    return next();
}