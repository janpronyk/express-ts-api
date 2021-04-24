const useSpy = jest.fn()
const listenSpy = jest.fn()


jest.doMock('express', () => {
  return () => ({
    listen: listenSpy,
    use: useSpy()
  })
})

test('should initialize an express server', () => {
  require('./app.ts')
  expect(listenSpy).toHaveBeenCalled()
})

