const Potion = require('./Potion');
const Character = require('./Character');

// ES6 SYNTAX:
class Enemy extends Character{
    constructor(name, weapon) {

        // call parent constructor here (the Character constructor)
        super(name);

        
        this.weapon = weapon;
        this.potion = new Potion();

        this.health = Math.floor(Math.random() * 10 + 85);
        this.strength = Math.floor(Math.random() * 5 + 5);
        this.agility = Math.floor(Math.random() * 5 + 5);
    };
    getDescription() {
        return `A ${this.name} holding a ${this.weapon} has appeared!`
    };

}










// ES5 SYNTAX:
// function Enemy(name,weapon){
//     this.name = name;
//     this.weapon = weapon;
//     this.potion = new Potion();

//     this.health = Math.floor(Math.random() * 10 + 85);
//     this.strength = Math.floor(Math.random() * 5 + 5);
//     this.agility = Math.floor(Math.random() * 5 + 5);
// };

// //INHERIT PROTOTYPE METHODS FROM Character HERE:
// Enemy.prototype = Object.create(Character.prototype);

// Enemy.prototype.getDescription = function(){
//     return `A ${this.name} holding a ${this.weapon} has appeared!`;
// };

module.exports = Enemy;