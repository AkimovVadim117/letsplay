const startButton = document.querySelector(".button-start");
const gameModal = document.querySelector(".modal-options");
const gamefield = document.querySelector(".gamefield");

startButton.addEventListener("click", () => {
   gameModal.style.display = "none";
   gamefield.style.display = "flex";

   const playerSide = (document.querySelector("#side_x").checked) ? "x" : "0";

   game(playerSide);
})

function game(playerSide) {
   const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
   const firstStep = getRandomInt(0, 1); // 1 - player, 0 - bot

   const statusTitle = document.querySelector(".game-status");

   let cells = [...document.querySelectorAll(".cell")];
   
   step(firstStep ? "player" : "bot", playerSide);

   function step(player) {
      if (player === "player") {
         statusTitle.textContent = "Ваш ход!";
         cells.forEach(cell => {
            cell.addEventListener("click", doStep);
         })
      } else {
         statusTitle.textContent = "Ходит бот!";
         setTimeout(() => {
            const botStep = getRandomInt(0, cells.length - 1);
            if (!cells[botStep].textContent) {
               cells[botStep].textContent = (playerSide === "x") ? "0" : "x";
               cells.forEach((cell, index) => {
                  if (cell === cells[botStep]) cells.splice(index, 1);
               });
            }
            if (checkField() === true) step("player");
         }, getRandomInt(250, 750));
      }
   }
   function doStep(event) {
      const thisCell = event.currentTarget;
      if (!thisCell.textContent) {
         cells = cells.filter(cell => !(cell === thisCell))
         thisCell.textContent = playerSide;
         cells.forEach(cell => cell.removeEventListener("click", doStep));
         if (checkField() === true) step("bot");
      }
   }
   function checkField() {
      const steps = [];
      document.querySelectorAll(".cell").forEach(cell => steps.push(cell.textContent));
      const botSide = (playerSide === "x") ? "0" : "x";
      let status;

      if ( (steps[0] === botSide && steps[1] === botSide && steps[2] === botSide) ||
           (steps[3] === botSide && steps[4] === botSide && steps[5] === botSide) ||
           (steps[6] === botSide && steps[7] === botSide && steps[8] === botSide) ||
           (steps[0] === botSide && steps[3] === botSide && steps[6] === botSide) ||
           (steps[1] === botSide && steps[4] === botSide && steps[7] === botSide) ||
           (steps[2] === botSide && steps[5] === botSide && steps[8] === botSide) ||
           (steps[0] === botSide && steps[4] === botSide && steps[8] === botSide) ||
           (steps[2] === botSide && steps[4] === botSide && steps[6] === botSide) ) { status = false; 
                                                                                      endGame("win bot");
                                                                                      return "win bot"; 
                                                                                    }

      if ( (steps[0] === playerSide && steps[1] === playerSide && steps[2] === playerSide) ||
           (steps[3] === playerSide && steps[4] === playerSide && steps[5] === playerSide) ||
           (steps[6] === playerSide && steps[7] === playerSide && steps[8] === playerSide) ||
           (steps[0] === playerSide && steps[3] === playerSide && steps[6] === playerSide) ||
           (steps[1] === playerSide && steps[4] === playerSide && steps[7] === playerSide) ||
           (steps[2] === playerSide && steps[5] === playerSide && steps[8] === playerSide) ||
           (steps[0] === playerSide && steps[4] === playerSide && steps[8] === playerSide) ||
           (steps[2] === playerSide && steps[4] === playerSide && steps[6] === playerSide) ) { status = false; 
                                                                                               endGame("win player");
                                                                                               return "win player"; 
                                                                                             }

      if (!cells.length && !status) { 
         endGame("draw");
         saveStats("draw", playerSide);
         return "draw";
      } 

      return true;
   }

   function endGame(status) {
      document.querySelector(".button-play-again").style.display = "block";
      document.querySelector(".button-play-again").addEventListener("click", () => window.location.reload());
      
      switch (status) {
         case "win bot":
            statusTitle.textContent = "Выиграл бот :(";
         break;
            
         case "win player":
            statusTitle.textContent = "Вы победили :)";
            break;
               
         case "draw":
            statusTitle.textContent = "Ничья :/";
            break;
                  
         default:
            console.error("Что-то пошло не так...")
            break;
      }
   }
} 
