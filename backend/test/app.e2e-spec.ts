import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Counter (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('increments and returns counter state', async () => {
    await request(app.getHttpServer())
      .get('/counter')
      .expect(200)
      .expect({ current: 0, history: [] });

    await request(app.getHttpServer())
      .post('/counter/increment')
      .expect(201)
      .expect({ current: 1, history: [1] });

    await request(app.getHttpServer())
      .get('/counter')
      .expect(200)
      .expect({ current: 1, history: [1] });
  });
});
