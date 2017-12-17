const overloadable = require('./index');

const func = new overloadable({rewriteOld: true});

function test(a,b) {
  console.log(a+b);
}

function test2(a,b,c) {
  console.log(c ? a : b);
}

let overloaded = func.overload(['number', 'number'], test);
func.overload(['string', 'number', 'boolean'], test2);

overloaded(1,2);
overloaded('aaa', 2, true);
overloaded('aaa', 2, false);