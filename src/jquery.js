$(document).ready(function(){
  var thermostat = new Thermostat();

  var showExtTemperature = function(resp){
    var tempInC = _convertKtoC(resp.main.temp);
    $('#outsideTemp').text(tempInC);
  };

  var updateLocalWeatherDisplay = function(location){
    var url = "http://api.openweathermap.org/data/2.5/weather";
    var city = "q=" + location;
    var appID = "appid=0fe786c5ab2f53ba371796181af553b4";
    var data = city + "&" + appID;
    $.getJSON(url, data, showExtTemperature);
  };

  var _convertKtoC = function (kelvins){
    return Math.round(kelvins - 273.15);
  };

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

  updateLocalWeatherDisplay($('#Location').val());

  $('#locForm').submit(function(event){
    var location = $('#Location').val();
    updateLocalWeatherDisplay(location);
    event.preventDefault();
  });
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
