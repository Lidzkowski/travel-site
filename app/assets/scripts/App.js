var $ = require('jquery');

var Person = require('./modules/Person.js');

var lukas = new Person("Lukas Idz", "blue");
lukas.greet();

var nata = new Person("Natalia", "green") ;
nata.greet();
