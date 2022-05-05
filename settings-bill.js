function settingsBill(){
    let theCallCost = 0;
    let theSmsCost = 0;
    let theCriticalLevelValue = 0;
    let theWarningLevelValue = 0;

    let callCostTotal = 0;
    let smsCostTotal = 0;
    let totalCost = 0;

    function setCallCost(cost){
        theCallCost = cost;
    }
    function getCallCost(){
        return theCallCost;
    }

    function setSmsCost(cost){
        theSmsCost = cost;
    }
    function getSmsCost(){
        return theSmsCost;
    }
    function setCriticalLevel(value){
        theCriticalLevelValue = value;
    }
    function getCriticalLevel(){
        return theCriticalLevelValue;
    }
    function setWarningLevel(value){
        theWarningLevelValue = value;
    }
    function getWarningLevel(){
        return theWarningLevelValue;
    }
    
    function makeCall(){
        if(!stopAddingAtCriticalLevel()){
            callCostTotal += theCallCost;
        }
    }
    function sendSms(){
        if(!stopAddingAtCriticalLevel()){
            smsCostTotal += theSmsCost;
        }
    }
    function getTotalCost(){
       return totalCost = callCostTotal + smsCostTotal;
    }
    function getTotalCallCost(){
        return callCostTotal; 
    }
    function getTotalSmsCost(){
        return smsCostTotal;
    }
    function stopAddingAtCriticalLevel(){
        return getTotalCallCost() >= getCriticalLevel();
    }
    function totalLevel(){
        if(stopAddingAtCriticalLevel()){
            return "critical";
        }
        if(getTotalCost() >= getWarningLevel()){
            return "warning";
        }
    }
    return {
        setCallCost,
        getCallCost,
        setSmsCost,
        getSmsCost,
        setCriticalLevel,
        getCriticalLevel,
        setWarningLevel,
        getWarningLevel,
        makeCall,
        sendSms,
        getTotalCost,
        getTotalCallCost,
        getTotalSmsCost,
        totalLevel,
        stopAddingAtCriticalLevel
    }
}