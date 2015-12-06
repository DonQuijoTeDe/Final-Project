describe('Test signalchannel ', function () {
    var subject;

    beforeEach(function () {
      subject = new SignalChannelManager();
    });

    describe('Test register function', function () {
      it('test object', function () {
        subject.register(null);
        assert.equal(subject.login_name, '', "The test is fail!");
      });
      it('test object', function () {
        subject.register(null);
        assert.isNotNull(subject.peer, "The test is fail!");
      });
    });

    describe('Test call_connecting function', function () {
      it('test object', function () {
        subject.register(null);
        subject.call_connecting();
        assert.equal(subject.call_name, '', "The test is fail!");
      });
      it('test object', function () {
        subject.register(null);
        subject.call_connecting();
        assert.isNotNull(subject.call, "The test is fail!");
      });
    });

});

describe('Test mediastream', function () {
  var subject;

  beforeEach(function () {
    subject = new MediaStreamManager();
  });

  describe('Test start function', function () {
    it('Test object' , function () {
      subject.start(false);
      assert.equal(subject.audio_set, false, "The test is fail!");
    });
    it('Test object' , function () {
      subject.start(true);
      assert.equal(subject.audio_set, true, "The test is fail!");
    });
    it('Test object' , function () {
      subject.start(null);
      assert.isNull(subject.audio_set, "The test is fail!");
    });
  });

});
