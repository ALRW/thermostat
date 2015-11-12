$(document).ready(function(){
  var thermostat = new Thermostat();

  var updateDisplay = function(){
    $('#temp').text(thermostat.temperature());
    _updatePSMStatus();
    $('.thermoDisplay').css('background-color',_getColor());
  };

  var _getColor = function(){
    switch(thermostat.energyUsage()) {
      case ("low-usage"):
        return 'green';
      case ("medium-usage"):
        return 'orange';
      case ("high-usage"):
        return 'red';
    }
  };

  var _updatePSMStatus = function(){
    var statusStr = thermostat.isPowerSavingOn() ? "on" : "off";
    $('#PSMStatus').text('power saving mode: '+ statusStr);
  };

  updateDisplay();

  $('#reset').on('click',function(){
    thermostat.resetButton();
    updateDisplay();
  });
  $('#tempUp').on('click',function(){
    thermostat.increaseTemperature();
    updateDisplay();
  });
  $('#tempDown').on('click',function(){
    thermostat.decreaseTemperature();
    updateDisplay();
  });
  $('#PSM').on('click',function(){
    thermostat.powerSavingButton();
    updateDisplay();
  });

});
