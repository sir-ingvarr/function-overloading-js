module.exports = class OverloadedFunction extends Function {
  constructor(options) {
    super();

    this.options = Object.assign({}, options);
    this.function = (...args) => {
      let key = "";
      args.map(val => {
        key += typeof val;
      })
      if(this.availableHandlers[key]) return this.availableHandlers[key].call(null, ...args);
      else throw new Error('no available handler for these types of arguments');
    };
    this.availableHandlers = {};
  }

  _isAbleToAddNew(key) {
    return key && !this.availableHandlers[key] || this.options.rewriteOld;
  }

  _makePrimaryValidations(parameterTypes, handler){
    let key;
    if(Array.isArray(parameterTypes)) {
      key = parameterTypes.length > 0 ? parameterTypes.join("") : "noparams"
    } else if( typeof parameterTypes === 'string'){
      key = parameterTypes;  
    } else {
      throw new Error('invalid type of the 1st argument');
    }
    return key;
  }

  overload(parameterTypes, handler) {
    try {
      let key = this._makePrimaryValidations(parameterTypes, handler);
      if(this._isAbleToAddNew(key)) {
        Object.defineProperty(this.availableHandlers, key, {
          enumerable: false,
          value: handler.bind(null),          
        });
      }
    } catch (exeption) {
      console.error(exeption);
    }
    return this.function;
  }
}