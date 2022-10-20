const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", game);

function game() {
   const stepModal = document.querySelector(".step-item-list");
   const stepItemList = [...document.querySelectorAll(".item")];
   const gameStatusTitle = document.querySelector(".game-status");
   const gameResultTitle = document.querySelector(".game-result");
   
   const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
   const firstStep = getRandomInt(0, 1); // 1 - player, 0 - bot
   
   startButton.style.display = "none";

   if (firstStep) { // Определяется, кто ходит первым
      doPlayerStep(null);
   } else {
      doBotStep(null);
   }

   function doPlayerStep(botStep = null) {
      if (botStep === null) { // Если игрок сходил первым...
         gameStatusTitle.textContent = "Ваш ход!"
         gameStatusTitle.style.display = "block";
         setTimeout(() => {
            gameStatusTitle.style.display = "none";
            stepModal.style.display = "flex";
            stepItemList.forEach(item => item.addEventListener("click", () => {
               stepModal.style.display = "none"
               doBotStep(item);
            }));
         }, 1000);
      } else { // Если бот сходил первым...
         gameStatusTitle.textContent = "Ходит бот...";
         gameStatusTitle.style.display = "block";
         setTimeout(() => {
            gameStatusTitle.style.display = "none";
            stepModal.style.display = "flex";
            stepItemList.forEach(item => item.addEventListener("click", () => {
               stepModal.style.display = "none"
               checkGame(botStep, item);
            }));
         }, 500);
      }
   }

   function doBotStep(playerStep = null) {
      const botItem = getRandomInt(1, 3);
      if (playerStep === null) { // Если бот сходил первым...
         doPlayerStep(botItem);
      } else { // Если игрок сходил первым...
         gameStatusTitle.textContent = "Ходит бот...";
         gameStatusTitle.style.display = "block";
         setTimeout(() => {
            gameStatusTitle.style.display = "none";
            checkGame(botItem, playerStep);
         }, 500);
      }
   }

   function checkGame(botItem, playerItem) {
      playerItem = (playerItem.querySelector(".item-title").textContent === "Камень") ? "Камень" :
                   (playerItem.querySelector(".item-title").textContent === "Ножницы") ? "Ножницы" :
                                                                           "Бумагу";
      botItem = (botItem === 1) ? "Камень" :
                (botItem === 2) ? "Ножницы" :
                                  "Бумагу";
      
      gameStatusTitle.textContent = `Вы выбрали ${playerItem.toLowerCase()}, а бот - ${botItem.toLowerCase()}`;
      gameStatusTitle.style.display = "block";
      
      if (playerItem === "Камень" && botItem === "Ножницы" ||
          playerItem === "Ножницы" && botItem === "Бумагу" ||
          playerItem === "Бумагу" && botItem === "Камень") {
            gameStatusTitle.textContent = `Вы выбрали ${playerItem.toLowerCase()}, а бот - ${botItem.toLowerCase()}`;
            setTimeout(() => {
               gameResultTitle.textContent = "Вы победили!";
               document.querySelector(".button-play-again").style.display = "block";
            }, 1500);
      }

      if (playerItem === "Бумагу" && botItem === "Ножницы" ||
          playerItem === "Камень" && botItem === "Бумагу" ||
          playerItem === "Ножницы" && botItem === "Камень") {
            gameStatusTitle.textContent = `Вы выбрали ${playerItem.toLowerCase()}, а бот - ${botItem.toLowerCase()}`;
            setTimeout(() => {
               gameResultTitle.textContent = "Вы проиграли...";
               document.querySelector(".button-play-again").style.display = "block";
            }, 1500);
      }

      if (playerItem === botItem) {
         gameStatusTitle.textContent = `Вы выбрали ${playerItem.toLowerCase()}, бот тоже выбрал ${botItem.toLowerCase()}`;
         setTimeout(() => {
            gameResultTitle.textContent = "Ничья :/";
            document.querySelector(".button-play-again").style.display = "block";
         }, 1500);
      }

      gameResultTitle.style.display = "block";
      document.querySelector(".button-play-again").addEventListener("click", () => location.reload());
   }
}