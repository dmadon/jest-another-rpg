const inquirer=require('inquirer');
const Enemy=require('./Enemy.js');
const Player=require('./Player.js');



function Game(){

    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
};// end of Game object properties constructor

Game.prototype.initializeGame = function(){

    this.enemies.push(new Enemy('goblin','sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    this.currentEnemy = this.enemies[0];


    inquirer
    .prompt({
        type: 'text',
        name: 'name',
        message: 'What is your name?'
    })
    // destructure name from the prompt object
    .then(({ name }) => {
        this.player = new Player(name);
        
        this.startNewBattle();
    })
};// end of initializeGame method

Game.prototype.startNewBattle = function(){
    if(this.player.agility>this.currentEnemy.agility){
        this.isPlayerTurn=true;
    }
    else{
        this.isPlayerTurn=false;
    }

    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());

    this.battle();
};// end of startNewBattle method

Game.prototype.battle = function(){
    if(this.isPlayerTurn){
        inquirer
            .prompt({
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Attack','Use Potion']
            })
            .then(({action})=>{
                if (action === 'Use Potion'){
                    if(!this.player.getInventory()){
                        console.log("Oh no! You don't have any potions! Tsk, tsk, tsk... you should have paid attantion.");
                        return this.checkEndOfBattle();
                    }
                    inquirer
                        .prompt({
                            type: 'list',
                            name: 'action',
                            message: 'Which potion would you like to use?',
                            choices: this.player.getInventory().map((item, index)=>`${index+1}: ${item.name}`)
                        })
                        .then(({action})=>{
                            const potionDetails=action.split(': ');

                            this.player.usePotion(potionDetails[0]-1);
                            console.log(`You used the ${potionDetails[1]} potion.`);
                            return this.checkEndOfBattle();
                        })
                }
                else{
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());
                    return this.checkEndOfBattle();
                }
            });
    }// end of isPlayerTurn(true)
    else{
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);
        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
        return this.checkEndOfBattle();
    };// end of isPlayerTurn(false)
};// end of battle method

Game.prototype.checkEndOfBattle = function(){
    if(this.player.isAlive() && this.currentEnemy.isAlive()){
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    }// end of if statement where both player and enemy are still alive
    else if(this.player.isAlive && !this.currentEnemy.isAlive()){
        console.log(`You have defeated the ${this.currentEnemy.name}!`);
        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found the ${this.currentEnemy.name}'s ${this.currentEnemy.potion.name} potion`);

        this.roundNumber++;

        if(this.roundNumber<this.enemies.length){
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        }
        else{
            console.log(`Congratulations! You have defeated all your foes. You are a mighty warrior, indeed, ${this.player.name}!`);
        }
    }// end of else statement where player is alive and enemy is dead
    else{
        console.log('You have been defeated.')
    }// end of else statement where player has been defeated

};// end of checkEndOfBattle method

module.exports = Game;
