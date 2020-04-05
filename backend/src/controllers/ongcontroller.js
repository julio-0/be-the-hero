const connection = require('../database/connection');
const generateUniqueId = require('../auth/generateUniqueId');
const generateToken = require('../auth/generateToken');

const bcrypt = require('bcryptjs');

module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    
    },
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        let { password } = request.body;
        const id = generateUniqueId();
        password = await bcrypt.hash(password, 8); 
    
        await connection('ongs').insert({
            id,
            name,
            email,
            password,
            whatsapp,
            city,
            uf,
        });
        const token = generateToken({'id': id});

        return response.json({ id , token });    
    },
    async update(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        const ong_id = request.ongId;

        await connection('ongs')
            .where('id', ong_id)
            .update({
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id: ong_id, name, email, whatsapp, city, uf });    
    }
}