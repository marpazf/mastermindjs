window.onload = function () {
  let computer = [];
  let human = [];
  let negros;
  let blancos;
  let juegoTerminado;
  let currentRow;
  let currentCol;

  const maxCol = 4; //  Número de colores a adivinar  (se puede cambiar)
  const maxRow = 8; //  Número de intentos posibles (se puede cambiar)
  const maxIntentos = maxRow;

  const start = document.querySelector('.computer');
  const check = document.querySelector('.check');
  const colorArray = document.querySelectorAll('.marble-colors');
  const message = document.querySelector('.message');

  const MESSAGE = {
    INICIO: "",
    GANA: "¡Enhorabuena!",
    PIERDE: "¡Inténtalo de nuevo!",
    CHECK: "Comprueba"
  };

  const colorDictionary = {
    0: 'red',
    1: 'blue',
    2: 'yellow',
    3: 'green',
    4: 'black',
    5: 'white'
  }
/*
      <!--
      <div class="marbles-solucion hide">
        <div class="marble-solucion"></div>
        <div class="marble-solucion"></div>
        <div class="marble-solucion"></div>
        <div class="marble-solucion"></div>
      -->
*/
  function createMarblesSolution () {
    let capa = document.querySelector(".marbles-solucion");
    for (let j = 0; j < maxCol; j++) {
      let marble = document.createElement("div");
      marble.classList.add("marble-solucion");
      capa.appendChild(marble);
    }
  }

  function createMarblesGame () {
    let capa = document.querySelector('.game');
    for (let i = 0; i < maxRow; i++) {
      let row = document.createElement("div");
      row.classList.add("row");

      let marbles = document.createElement("div");
      marbles.classList.add("marbles");

      for (let j = 0; j < maxCol; j++) {
        let marble = document.createElement("div");
        marble.classList.add("marble");
        marbles.appendChild(marble);
      }

      let hints = document.createElement("div");
      hints.classList.add("hints");

      for (let j = 0; j < maxCol; j++) {
        let hint = document.createElement("div");
        hint.classList.add("hint");
        hints.appendChild(hint);
      }
      row.appendChild(marbles);
      row.appendChild(hints);
      capa.appendChild(row)
    }
  }

  // Event Listener
  start.addEventListener('click', () => {
    inicioJuego();
  });

  colorArray.forEach(function (item, index) {
    item.addEventListener('click', function () {
      if (juegoTerminado) {
        return;
      }
      if (currentCol < maxCol) {
        getColor(item, index);
      }
    });
  });

  check.addEventListener('click', () => {
    if (juegoTerminado) {
      return;
    }
    if (currentCol != maxCol) {
      return;
    }

    compruebaNumero();
    finJuego();

    negros = 0;
    blancos = 0;
    currentRow++;
    currentCol = 0;
  });
  // /Event Listener


  function inicioJuego() {
    negros = 0;
    blancos = 0;
    juegoTerminado = false;
    currentRow = 0;
    currentCol = 0;
    message.innerHTML = MESSAGE.INICIO;

    setComputer();
    clearRender();
  }

  function getColor(item, index) {
    human[currentCol] = index;
    renderMarbles();
    currentCol++;
  }

  // Con repetición
  function setComputer() {
    for (let i = 0; i < maxCol; i++) {
      computer[i] = randomIntFromRange(0, 5);
    }
    console.log("computer: ", computer);
  }

  function compruebaNumero() {
    let checkH = human.slice(0);
    let checkC = computer.slice(0);
    human.forEach((humanDigito, index) => {
      if (humanDigito == computer[index]) {
        negros++;
        checkH[index] = 10; // Valores no válidos: 10 y 11, para que no los vuelva a contar
        checkC[index] = 11;
      }
    });
    checkH.forEach((humanDigito, index) => {
      if (checkC.includes(humanDigito)) {
        blancos++;
        checkC[checkC.indexOf(humanDigito)] = 11;
      }
    });
    renderHints();
  }

  function finJuego() {
    juegoTerminado = true;
    let intentos = currentRow + 1;
    if (negros == maxCol) {
      message.innerHTML = MESSAGE.GANA;
      renderSolution();
    } else if (intentos >= maxIntentos) {
      message.innerHTML = MESSAGE.PIERDE;
      renderSolution();
    } else {
      juegoTerminado = false;
    }
  }

  function renderHints() {
    hints = document.querySelectorAll('.hint');
    for (let i = 0; i < negros; i++) {
      hints[(currentRow * maxCol) + i].classList.add('black');
    }
    for (let i = negros; i < negros + blancos; i++) {
      hints[(currentRow * maxCol) + i].classList.add('white');
    }
  }

  function renderMarbles() {
    if (currentCol < maxCol && currentRow < maxRow) {
      marbles = document.querySelectorAll('.marble');
      let currentColor = human[currentCol];
      marbles[(currentRow * maxCol) + currentCol].classList.add(colorDictionary[currentColor]);
    }
  }

  function clearRenderHints() {
    hints = document.querySelectorAll('.hint');
    Array.from(hints).forEach((hint) => {
      hint.classList.remove('black', 'white');
    })
  }

  function clearRenderMarbles() {
    marbles = document.querySelectorAll('.marble');
    Array.from(marbles).forEach((marble) => {
      marble.classList.remove('black', 'white', 'red', 'blue', 'green', 'yellow');
    })
  }

  function renderSolution() {
    document.querySelector('.marbles-solucion').classList.remove('hide');
    marblesSolution = document.querySelectorAll('.marble-solucion');
    computer.forEach((color, index) => {
      marblesSolution[index].classList.add(colorDictionary[color]);
    })
  }

  function clearRenderSolution() {
    document.querySelector('.marbles-solucion').classList.add('hide');

    marblesSolution = document.querySelectorAll('.marble-solucion');
    Array.from(marblesSolution).forEach((marble) => {
      marble.classList.remove('black', 'white', 'red', 'blue', 'green', 'yellow');
    })
  }

  function clearRender() {
    clearRenderHints();
    clearRenderMarbles();
    clearRenderSolution();
  }

  // Cuando recarga la página
  createMarblesGame();
  createMarblesSolution();
  inicioJuego();
};
