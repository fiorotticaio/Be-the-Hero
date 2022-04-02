const connection = require('../database/connection');


module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query; // caso não venha na url vai incializar com 1

        /* esse [] é porque o .count() retorna um array, então serve pra pegar 
        a primeira posição que na verdade é o valor que queremos mesmo */
        const [count] = await connection('incidents').count();
        console.log(count);

        /* talvez tenha problema no cod do Diego aqui...
        * não ta listando os casos da ong só com o id da Authorization,
        * e sim todos os incidents */
        const incidents = await connection('incidents')
            .join('ongs', 'ong_id', '=', 'incidents.ong_id')
            .limit(5) // limita a busca a apenas 5 registros
            .offset((page-1) * 5) // o quanto vai pular inicialmente na lista de resgistros
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf']);

        res.header('X-Total-Count', count['count(*)']);    
        
        return res.json(incidents);
    },

    async create(req, res) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return res.json({ id });
    },

    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first(); // selecionar o primeiro da coluna (só tem 1 mesmo)

        if (incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'Operation not permitted,' });
        }

        await connection('incidents').where('id', id).delete();

        return res.status(204).send();
    }
}