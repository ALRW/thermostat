function Thermostat() {
  this._DEFAULT_TEMPERATURE = 20;
  this._currentTemperature = 20;
  this._MINIMUM_TEMPERATURE = 10;
  this._POWER_SAVER = true;
  this._MAXIMUM_TEMPERATURE_PSM_ON = 25;
  this._MAXIMUM_TEMPERATURE_PSM_OFF = 32;
  this.MEDIUM_ENERGY_USAGE_LIMIT = 18;

}

Thermostat.prototype.temperature = function() {
  return this._currentTemperature;
};
Thermostat.prototype.isMinimumTemperature = function() {
  return this._currentTemperature === this._MINIMUM_TEMPERATURE;
};
Thermostat.prototype.isMaximumTemperature = function() {
  if(this.isPowerSavingOn() === true){
  return this._currentTemperature === this._MAXIMUM_TEMPERATURE_PSM_ON;}
  return this._currentTemperature === this._MAXIMUM_TEMPERATURE_PSM_OFF;
};
Thermostat.prototype.increaseTemperature = function(){
  if(this.isMaximumTemperature()){
    return; }
  this._currentTemperature += 1;
};
Thermostat.prototype.decreaseTemperature = function(){
  if (this.isMinimumTemperature()) {
  return; }
  {this._currentTemperature -= 1;}
};
Thermostat.prototype.isPowerSavingOn = function(){
  return this._POWER_SAVER === true;
};

// Thermostat.prototype.turnOffPowerSaving = function(){
//   this._POWER_SAVER = false;
// };
// Thermostat.prototype.turnOnPowerSaving = function(){
//   this._POWER_SAVER = true;
// };
Thermostat.prototype.powerSavingButton = function() {
  this._POWER_SAVER = !this._POWER_SAVER;
};

Thermostat.prototype.resetButton = function () {
  this._currentTemperature = this._DEFAULT_TEMPERATURE;
};
Thermostat.prototype.energyUsage = function (){
  if (this._currentTemperature < this.MEDIUM_ENERGY_USAGE_LIMIT)
    return "low-usage";
  else if (this._currentTemperature < this._MAXIMUM_TEMPERATURE_PSM_ON)
    return "medium-usage";
  else
    return "high-usage";
};
