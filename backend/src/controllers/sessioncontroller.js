const connection = require('../database/connection');
const bcrypt = require('bcryptjs');
const generateToken = require('../auth/generateToken');

module.exports = {
    async create(request, response) {

        const { id, password } = request.body;
        const ong = await connection('ongs').where({'id': id})
            .select().first();

        if (!ong) {
            return response.status(400)
                .json({ error: 'No NGO found with this ID'});
        }
    
            //const token = await auth.attempt(id, password)

        if (!await bcrypt.compare(password, ong.password) ) {
            return response.status(400)
                .json({ error: 'Invalid Password.'});
        }

        const token = generateToken({'id': id});

        return response.json({ong, token});    
    }
}