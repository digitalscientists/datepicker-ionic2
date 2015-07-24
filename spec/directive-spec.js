'use strict';

describe('DatepickerDirectiveSpec', function() {

  var elm
    , scope
    , controller;

  beforeEach(module('ionic-datepicker'));
  beforeEach(module('ionic-datepicker.templates'));

  beforeEach(inject(function(ionicDatepickerDirective) {
    ionicDatepickerDirective[0].controller = function() {
      this.createDateList = function() {};
      this.onCancel = function() {};
      this.onDone = function() {};
      controller = this;
    };
  }));

  beforeEach(function() {
    compileDirective();
  });

  function compileDirective(tpl) {

    if (!tpl) tpl = '<ionic-datepicker date="currentDate" callback="callback"></ionic-datepicker>';
    inject(function($rootScope, $compile) {
      elm = $compile(tpl)($rootScope.$new());
      scope = elm.isolateScope();
    });
    scope.$digest();
  }

  describe('when element is clicked', function() {

    it('should show Popup', function() {
      var spy = sinon.spy(controller, 'createDateList');
      elm.triggerHandler('click');
      expect(spy).to.have.been.called;
    });
  });

  describe('when user clicks on cancel', function() {

    beforeEach(function() {
      scope.modal = {
        remove: function() {}
      };
    });

    it('should call controller.onCancel()', function() {
      var spy = sinon.spy(controller, 'onCancel');
      scope.onCancel();
      expect(spy).to.have.been.called;
    });

    it('should call scope.modal.onCancel()', function() {
      var spy = sinon.spy(scope.modal, 'remove');
      scope.onCancel();
      expect(spy).to.have.been.called;
    });
  });

  describe('when user clicks on done', function() {

    beforeEach(function() {
      scope.modal = {
        remove: function() {}
      };
    });

    it('should call controller.onDone()', function() {
      var spy = sinon.spy(controller, 'onDone');
      scope.onDone();
      expect(spy).to.have.been.called;
    });

    it('should call scope.modal.onDone()', function() {
      var spy = sinon.spy(scope.modal, 'remove');
      scope.onCancel();
      expect(spy).to.have.been.called;
    });
  });

  describe('#show', function() {

    var modal;
    beforeEach(function() {
      modal = {
        show: function() {}
      };
    });

    it('should set modal in scope', function() {
      scope.show(modal);
      expect(scope.modal).to.be.ok;
    });

    it('should call scope.modal.show()', function() {
      var spy = sinon.spy(modal, 'show');
      scope.show(modal);
      expect(spy).to.have.been.called;
    });
  });

});
