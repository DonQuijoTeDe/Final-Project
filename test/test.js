describe('Test SignalChannelManager ', function () {
    var subject;

    beforeEach(function () {
      subject = new SignalChannelManager();
    });

    describe('Test register function', function() {
      it('test object', function () {
        subject.register(null);
        assert.equal(subject.login_name, '', "The test is fail!");
        this.peer = ''
      });

      it('test object', function () {
        subject.register(null);
        assert.isNotNull(subject.peer, "The test is fail!");
      });
    })

});
