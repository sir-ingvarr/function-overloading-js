## Function overloading

### Usage

* Instantiate class OverloadedFunction
* Use *overload* method (argsTypes: Array\<string\>, handler: Function)

```
const OverloadedFunction = require('./index');

const func = new OverloadedFunction({rewriteOld: true});

func
    .overload([], () => console.log('no args passed'))
    .overload(['number', 'number'], (a, b) => console.log(a+b))
    .overload(['string', 'number', 'boolean'], (a, b, c) => console.log(c ? a : b));


func(); // 'no args passed'
func(1,2); // 3
func('foo', 2, true); // 'aaa'
func('bar', 2, false); // 2
func(2,3,3); // will error 'no available handler for number,number,number arguments'
```