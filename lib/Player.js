const Character = require('./Character');
const Potion = require('../lib/Potion');


// ES6 SYNTAX:
class Player extends Character{
  constructor(name = '') {

    // call parent constructor here (the Character constructor)
    super(name);


    this.inventory = [new Potion('health'), new Potion()];
  }

  getStats() {
    return {
      potions: this.inventory.length,
      health: this.health,
      strength: this.strength,
      agility: this.agility
    };
  }

  getInventory() {
    if (this.inventory.length) {
      return this.inventory;
    }
    return false;
  }

  addPotion(potion) {
    this.inventory.push(potion);
  }

  usePotion(index) {
    const potion = this.inventory.splice(index, 1)[0];

    switch (potion.name) {
      case 'agility':
        this.agility += potion.value;
        break;
      case 'health':
        this.health += potion.value;
        break;
      case 'strength':
        this.strength += potion.value;
        break;
    }
  }
}












// ES5 SYNTAX:
// function Player(name = '') {
//   this.name = name;

//   this.health = Math.floor(Math.random() * 10 + 95);
//   this.strength = Math.floor(Math.random() * 5 + 7);
//   this.agility = Math.floor(Math.random() * 5 + 7);

//   this.inventory = [new Potion('health'), new Potion()];
// }// end of Player object properties constructor

// //INHERIT PROTOTYPE METHODS FROM Character HERE:
// Player.prototype = Object.create(Character.prototype);


// Player.prototype.getStats = function() {
//   return {
//     potions: this.inventory.length,
//     health: this.health,
//     strength: this.strength,
//     agility: this.agility
//   };
// };// end of getStats method

// Player.prototype.getInventory = function() {
//   if (this.inventory.length) {
//     return this.inventory;
//   }
//   return false;
// };// end of getInventory method

// Player.prototype.addPotion = function(potion){
//     this.inventory.push(potion);
// }// end of addPotion method

// Player.prototype.usePotion = function(index){
//     const potion = this.getInventory().splice(index,1)[0];

//     switch(potion.name){
//         case 'agility':
//             this.agility+=potion.value;
//             break;
//         case 'health':
//             this.health+=potion.value;
//             break;
//         case 'strength':
//             this.strength+=potion.value;
//             break;
//     }
// };// end of usePotion method


module.exports = Player;
