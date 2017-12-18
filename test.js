const overloadable = require('./index');

const func = new overloadable({rewriteOld: true});

function test(a,b) {
  console.log(a+b);
}

function test2(a,b,c) {
  console.log(c ? a : b);
}

func.overload(['number', 'number'], test).overload(['string', 'number', 'boolean'], test2);

func(1,2);
func('aaa', 2, true);
func('aaa', 2, false);