function Event(name){
  this.name = name;
  this.callbacks = [];
}
Event.prototype.registerCallback = function(callback){
  this.callbacks.push(callback);
}

function Reactor(){
  this.events = {};
}

Reactor.prototype.registerEvent = function(eventName){
  var event = new Event(eventName);
  this.events[eventName] = event;
};

Reactor.prototype.dispatchEvent = function(eventName, ...eventArgs){
  this.events[eventName].callbacks.forEach(function(callback){
    callback(...eventArgs);
  });
};

Reactor.prototype.addEventListener = function(eventName, callback){
  this.events[eventName].registerCallback(callback);
};

Reactor.prototype.removeEventListener = function(eventName, callback){
	const index = this.events[eventName].callbacks.indexOf(callback);
  this.events[eventName].callbacks.splice(index, 1);
};

export default Reactor;