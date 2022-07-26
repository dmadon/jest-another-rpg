class Character{
    constructor(name = ''){
        this.name = name;
        this.health = Math.floor(Math.random() * 10 + 95);
        this.strength = Math.floor(Math.random() * 5 + 7);
        this.agility = Math.floor(Math.random() * 5 + 7);
    }

}

Character.prototype.isAlive = function(){
    if(this.health === 0){
        return false;
    }
    return true;
};// end of isAlive method

Character.prototype.getHealth = function(){
    return `${this.name}'s health is now ${this.health}!`;
};// end of getHealth method

Character.prototype.getAttackValue = function(){
    const min = this.strength -5;
    const max = this.strength +5;

    return Math.floor(Math.random() *(max-min)+min);
};// end of getAttackValue method

Character.prototype.reduceHealth = function(health){
    this.health -= health;
    if(this.health<0){
        this.health=0;
    }
};// end of reduceHealth method

console.log(new Character().getHealth());

module.exports = Character;

