$(document).ready(function(){
  var thermostat = new Thermostat();

  var _getTempPercent = function(){
    var minTemp = thermostat._MINIMUM_TEMPERATURE;
    var maxTemp = thermostat._MAXIMUM_TEMPERATURE_PSM_OFF;
    var currentTemp = thermostat.temperature();
    return (currentTemp - minTemp)/(maxTemp - minTemp);
  };

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
    _updateBackgroundColor();
    // $('.thermoDisplay').css('background-color',_getColor());
  };

  var _getRGB = function(percent){
    var green = Math.round(255 - (percent * 255));
    var red = Math.round(percent < 0.5 ? percent * 2 * 255 : 255);
    var blue = 0;
    var opacity = 0.5;
    var string = 'rgba(' + red + ',' + green + ',' + blue + ',' + opacity + ')';
    return string;
  };

  var _updateBackgroundColor = function(){
    percent = _getTempPercent();
    console.log(percent);
    console.log(_getRGB(percent));
    $('.overlay').css('background-color',_getRGB(percent));
  };

  // var _getColor = function(){
  //   switch(thermostat.energyUsage()) {
  //     case ("low-usage"):
  //       return 'green';
  //     case ("medium-usage"):
  //       return 'orange';
  //     case ("high-usage"):
  //       return 'red';
  //   }
  // };

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
