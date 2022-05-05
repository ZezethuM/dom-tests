describe('Test settings bill function', function(){
    it('should be able get the call cost', function(){
        const billSetting = settingsBill();
        billSetting.setCallCost(5.00);
        assert.equal(5.00, billSetting.getCallCost());
    });

    it('should be able get the sms cost', function(){
        const billSetting = settingsBill();
        billSetting.setSmsCost(2.00);
        assert.equal(2.00, billSetting.getSmsCost())
    });

    it('should be able get the sms and call cost', function(){
        const billSetting = settingsBill();
        billSetting.setCallCost(5.00);
        billSetting.setSmsCost(2.00);
        assert.equal(5.00, billSetting.getCallCost());
        assert.equal(2.00, billSetting.getSmsCost());
    });

    it('should be able get the warning cost', function(){
        const billSetting = settingsBill();
        billSetting.setWarningLevel(20);
        assert.equal(20, billSetting.getWarningLevel());
    });

    it('should be able get the critical cost', function(){
        const billSetting = settingsBill();

        billSetting.setCriticalLevel(30);
        assert.equal(30, billSetting.getCriticalLevel())
    });

    it('should be able get the warning & critical cost', function(){
        const billSetting = settingsBill();

        billSetting.setWarningLevel(20);
        billSetting.setCriticalLevel(30);

        assert.equal(20, billSetting.getWarningLevel())
        assert.equal(30, billSetting.getCriticalLevel())

    });
});

describe('Use the settings bill function values', function(){
it('should be to use call cost set set for 3 calls at R2.00 each', function(){
    let billSetting = settingsBill();

    billSetting.setCallCost(2.00);
    billSetting.setCriticalLevel(30);

    billSetting.makeCall();
    billSetting.makeCall();
    billSetting.makeCall();

    assert.equal(6.00, billSetting.getTotalCost());
    assert.equal(6.00, billSetting.getTotalCallCost());
    assert.equal(0.00, billSetting.getTotalSmsCost());

})
it("should be to use sms cost set set for 3 sms's at R0.50 each", function(){
    let billSetting = settingsBill();

    billSetting.setSmsCost(0.50);
    billSetting.setCriticalLevel(30);

    billSetting.sendSms();
    billSetting.sendSms();
    billSetting.sendSms();

    assert.equal(1.50, billSetting.getTotalCost());
    assert.equal(0.00, billSetting.getTotalCallCost());
    assert.equal(1.50, billSetting.getTotalSmsCost());

});
it("should be to use sms and call cost set for 3 sms's & 4 calls at R0.50 & R2.00 each", function(){
    let billSetting = settingsBill();

    billSetting.setSmsCost(0.50);
    billSetting.setCallCost(2.00);
    billSetting.setCriticalLevel(30);

    billSetting.sendSms();
    billSetting.sendSms();
    billSetting.sendSms();
    billSetting.makeCall();
    billSetting.makeCall();
    billSetting.makeCall();
    billSetting.makeCall();

    assert.equal(9.50, billSetting.getTotalCost());
    assert.equal(8, billSetting.getTotalCallCost());
    assert.equal(1.50, billSetting.getTotalSmsCost());
});

});
describe('Warning and Critical level', function(){

    it('it should return "warning" if warning level is reached', function(){
         let billSetting = settingsBill();

         billSetting.setCallCost(5);
         billSetting.setSmsCost(2);
         billSetting.setWarningLevel(20);
         billSetting.setCriticalLevel(30);

         billSetting.makeCall()
         billSetting.makeCall()
         billSetting.sendSms()
         billSetting.sendSms()
         billSetting.sendSms()
         billSetting.sendSms()
         billSetting.sendSms()

         assert.equal("warning", billSetting.totalLevel());
    });

    it('it should return "critical" if critical level is reached', function(){
        let billSetting = settingsBill();

        billSetting.setCallCost(5);
        billSetting.setSmsCost(2);
        billSetting.setWarningLevel(20)

        billSetting.makeCall()
        billSetting.makeCall()
        billSetting.sendSms()
        billSetting.sendSms()
        billSetting.sendSms()
        billSetting.sendSms()
        billSetting.sendSms()
        billSetting.makeCall()
        billSetting.makeCall()

        assert.equal("critical", billSetting.totalLevel());
   });

   it('it should stop the total call cost from increasing when the critical level is reached', function(){
    let billSetting = settingsBill();

    billSetting.setCallCost(5);
    billSetting.setSmsCost(2);
    billSetting.setCriticalLevel(30);

    billSetting.makeCall();
    billSetting.makeCall();
    billSetting.makeCall();
    billSetting.makeCall();
    billSetting.makeCall();
    billSetting.makeCall();
    billSetting.makeCall();

    assert.equal("critical", billSetting.totalLevel());
    assert.equal(30, billSetting.getTotalCallCost());
});

it('it should allow total increase when critical level has been updated', function(){
    let billSetting = settingsBill();

    billSetting.setCallCost(5);
    billSetting.setSmsCost(2);
    billSetting.setWarningLevel(20)
    billSetting.setCriticalLevel(30);

    billSetting.makeCall();
    billSetting.makeCall();
    billSetting.makeCall();
    billSetting.makeCall();
    billSetting.makeCall();
    billSetting.makeCall();
    

    assert.equal("critical", billSetting.totalLevel());
    assert.equal(30, billSetting.getTotalCallCost());

    billSetting.setCriticalLevel(40);

    assert.equal("warning", billSetting.totalLevel());
    billSetting.makeCall();
    billSetting.makeCall();
    assert.equal(40, billSetting.getTotalCallCost());


    




});

});

