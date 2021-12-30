import app from "../../../app";
import request from 'supertest';

describe("GET /api/hello ", () => {
  test("return on message hello",async () => {
     const message = await request(app.app).get('/api/hello').send()
     expect(message.statusCode).toBe(200);
  });
});
