class TestController {
  async index (req, res) {
    res.send('Hello World! NODE.JS TEST VALIDATOR')
  }
}

module.exports = new TestController()
