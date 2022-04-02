const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    /* zerando o banco de dados antes de começar o teste */
    beforeEach(async () => {
        await connection.migrate.rollback(); // pra apagar os posts feitos
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })
    
    it('should be able to crate a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAA",
                email: "contato@test.com",
                whatsapp: "4700000000",
                city: "Rio do Sul",
                uf: "SC"
            });
        // .set('Authorization', 'id da ong válida')
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});