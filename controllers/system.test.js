jest.setTimeout(5000)

describe('server test', () => {
  let app
  beforeAll(async () => {
    app = await require('../start')
    return app.ready()
  })
  afterAll(() => {
    return app.close()
  })

  it('responds with success on request / ', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/',
    })

    expect(response.statusCode).toBe(200)
    const keys = ['apiVersion', 'environment']
    expect(Object.keys(response.json())).toEqual(keys)
  })
})
