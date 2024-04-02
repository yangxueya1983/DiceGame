


const $computer_Dice1_img   = $("#computer_Dice1_img")
const $computer_Dice2_img   = $("#computer_Dice2_img")
const $player_Dice1_img     = $("#player_Dice1_img")
const $player_Dice2_img     = $("#player_Dice2_img")

const $computer_Dice1_text  = $("#computer_Dice1_text")
const $computer_Dice2_text  = $("#computer_Dice2_text")
const $player_Dice1_text    = $("#player_Dice1_text")
const $player_Dice2_text    = $("#player_Dice2_text")


const $computer_TotalScore      = $("#computer_TotalScore")
const $computer_CurrentScore    = $("#computer_CurrentScore")
const $player_TotalScore        = $("#player_TotalScore")
const $player_CurrentScore      = $("#player_CurrentScore")


const maxNumberOfRound = 3
let roundCount = 0

class Dice {
    constructor(diceValue){
        this.diceValue = diceValue
        this.updateImage()
    }

    roll() {
        this.diceValue = Math.floor(Math.random() * 6) + 1
        this.updateImage()
    }

    updateImage() {
        if (this.diceValue>0 && this.diceValue<6) {
            this.imageSrc = `images/dice-${this.diceValue}.png`
        } else {
            this.imageSrc = "images/dice-1.png"
        }
    }
    
    
}

class DicePlayer {
    constructor(name){
        this.name = name
        this.totalScore = 0
        let d1 = new Dice(1)
        let d2 = new Dice(1)

        this.dices = [d1, d2]
    }

    roll() {
        for(let i=0; i<this.dices.length; i++){
            let dice = this.dices[i]
            dice.roll()
        }
        this.totalScore += this.getScore()
    }

    getScore() {
        let d1Val = this.dices[0].diceValue 
        let d2Val = this.dices[1].diceValue
        if (d1Val == 1 || d2Val == 1) {
            return 0
        } else if (d1Val == d2Val) {
            return (d1Val + d2Val) * 2
        } else {
            return d1Val + d2Val
        }
    }

    reset(){
        this.totalScore = 0
    }
}

let playerComputer = new DicePlayer("Computer")
let player = new DicePlayer("Player")


function updateUI() {

    $computer_CurrentScore.text(`${playerComputer.getScore()}`)
    $computer_TotalScore.text(`Total Score: ${playerComputer.totalScore}`)
    $player_CurrentScore.text(`${player.getScore()}`)
    $player_TotalScore.text(`Total Score: ${player.totalScore}`)

    $computer_Dice1_text.text(`${playerComputer.dices[0].diceValue}`)
    $computer_Dice2_text.text(`${playerComputer.dices[1].diceValue}`)
    $player_Dice1_text.text(`${player.dices[0].diceValue}`)
    $player_Dice2_text.text(`${player.dices[1].diceValue}`)

    $computer_Dice1_img.prop("src", playerComputer.dices[0].imageSrc);
    $computer_Dice2_img.prop("src", playerComputer.dices[1].imageSrc);

    $player_Dice1_img.prop("src", player.dices[0].imageSrc);
    $player_Dice2_img.prop("src", player.dices[1].imageSrc);
    
     
}




$("#newGameBtn").click(function(){
    playerComputer.reset()
    player.reset()
    roundCount = 0
    updateUI()
    $("#gameResult").text("Enjoy Game")
})
$("#rollBtn").click(function(){
    if (roundCount < maxNumberOfRound-1) {
        playerComputer.roll()
        player.roll()
        updateUI()

        roundCount ++
        $("#gameResult").text(`Round ${roundCount}`)
    } else {
        let resultText = ""
        if (player.totalScore > playerComputer.totalScore) {// player win
            resultText = "You win"
        } else if (player.totalScore == playerComputer.totalScore) {// same
            resultText = "Both win"
        } else {
            resultText = "Computer win"
        }
        $("#gameResult").text(resultText)
        
    }
    
})
