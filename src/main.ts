// Importamos las exportaciones necesarias del archivo maps.mjs
import { emojis, maps } from './global/maps.mjs'
import timeFormath from './tools/TimeFormat.mjs'

// Definimos las interfaces y tipos necesarios
interface positions {
  x: undefined | number,
  y: undefined | number
}
type num = number
type positionsNumOnly = Array<{x:number,y:number}>

// Inicializamos las variables necesarias

// posiciones
export let playerPosition: positions = {
  x:undefined,
  y:undefined,
}
export let giftPosition: positions = {
  x:undefined,
  y:undefined,
}
export let enemiesPositions: positionsNumOnly = []

// tamaños del canvas
export let canvasSize: num
export let elementsSize: num

// número de celdas
export const cellsQuantity: num = 10

// parámetros del juego
export let level: num = 0
export let lives: num = 3
export let timeStart: num | undefined
export let timeInterval: num | undefined
export let gameInit: boolean = false

// seleccionamos el canvas y definimos su contexto
const canvas = document.querySelector('#game') as HTMLCanvasElement
const game = canvas.getContext('2d') 

// seleccionamos los botones y el botón de iniciar juego
const upBtn = document.getElementById('up')!
const leftBtn = document.getElementById('left')!
const rightBtn = document.getElementById('right')!
const downBtn = document.getElementById('down')!
const startGameBtn = document.getElementById('start-game')!
const ModalStartGameBtn = document.getElementById('modal-start-game')!
const ModalGameOver = document.getElementById('modal-game-over')!
const ModalGameWin = document.getElementById('modal-game-win')!
const GameWinContinueBtn = document.getElementById('finish')!
const GameWinMessage = document.getElementById('win-message')!
const GameOverContinueBtn = document.getElementById('start-game-after')!
const GameOverCancelBtn = document.getElementById('no-continue')!

// seleccionamos el span donde irán las vidas y el tiempo de juego
const spanLives = document.getElementById('lives')!
const spanTime = document.getElementById('time')!
const spanLivesTwo = document.getElementById('lives-2')!
const spanTimeTwo = document.getElementById('time-2')!

// seleccionamos donde iran tanto el record como el resultado en base a este
const spanRecord = document.getElementById('record')!
const spanRecordTwo = document.getElementById('record-2')!

// cuando hagamos click, ejecutamos su función correspondiente
upBtn.addEventListener('click', moveUp)
leftBtn.addEventListener('click', moveLeft)
rightBtn.addEventListener('click', moveRight)
downBtn.addEventListener('click', moveDown)

// creamos sus respectivas funciones
function moveUp() {
  if(playerPosition.y !== undefined) {
    if(!(Math.ceil(playerPosition.y - elementsSize) < elementsSize)) {
      playerPosition.y -= elementsSize
      startGame()
    } 
  }
} 

function moveLeft() {
  if(playerPosition.x !== undefined) {
    if(!(Math.ceil(playerPosition.x - elementsSize) < elementsSize)) {
      playerPosition.x -= elementsSize
      startGame()
    } 
  }
}

function moveRight() {
  if(playerPosition.x !== undefined) {
    if(!(Math.floor(playerPosition.x + elementsSize) > canvasSize)) {
      playerPosition.x += elementsSize
      startGame()
    }
  } 
}

function moveDown() {
  if(playerPosition.y !== undefined) {
    if(!(Math.floor(playerPosition.y + elementsSize) > canvasSize)) {
      playerPosition.y += elementsSize
      startGame()
    }
  }
}

// cuando oprimamos una flecha (x) en el teclado ejecutamos una función manejadora de las flechas
window.addEventListener('keydown', moveByKeys)

// creamos sus respectivas funciones
function moveByKeys(event: { key: any }) {
  const key = event.key

  if (key === 'ArrowUp' || key === 'w') moveUp()
  else if (key === 'ArrowLeft' || key === 'a') moveLeft()
  else if (key === 'ArrowRight' || key === 'd') moveRight()
  else if (key === 'ArrowDown' || key === 's') moveDown()
}

// ejecutamos la función solo cuando cargue el HTML y cambie el tamaño de la pantalla
startGameBtn.addEventListener('click', () => { gameInit = true; setCanvasSize() })
window.addEventListener('resize', setCanvasSize)

// definimos una función que renderiza el tamaño del canvas en base al tamaño de la pantalla
function setCanvasSize() {
  if(gameInit === true) {
    window.innerHeight > window.innerWidth
    ? canvasSize = window.innerWidth * 0.65
    : canvasSize = window.innerHeight * 0.65

    Number(canvasSize.toFixed(0))
    canvas?.setAttribute('width', String(canvasSize))
    canvas?.setAttribute('height', String(canvasSize))

    elementsSize = canvasSize / cellsQuantity

    playerPosition.x = undefined
    playerPosition.y = undefined

    // cuando renderice el canvas iniciamos el juego
    startGame()

    if(ModalStartGameBtn) {
      ModalStartGameBtn.style.display = 'none' 
    }
  }
}

// el juego inicia
export function startGame() {
  if (gameInit == true) {
    if(game) {
      // seleccionamos el mapa
      const map = maps[level]
      
      // si no hay más mapas
      if(!map) {
        // ganas el juego
        gameWin()
        // terminamos todos los procesos
        return
      }
  
      // si el tiempo iniciado no tiene un valor
      if (!timeStart) {
        timeStart = Date.now()
        clearInterval(timeInterval)
        timeInterval = setInterval(showTime, 100)
        showRecord()
      }
      
      // creamos la primera fila y luego la dividimos para tener todo el mapeado con un array bidimencional
      const mapRows: string[] = map.trim().split('\n')
      const mapRowsCols: string[][] = mapRows.map(row => row.trim().split(''))
  
      // definimos el tamaño del texto y donde se va a centrar
      game.font = `${elementsSize * 0.95}px Verdana`
      game.textAlign = 'right'
  
      // limpiamos la posición de los enemigos
      enemiesPositions = []
  
      // limpiamos el canvas en caso de que haya algo
      game.clearRect(0, 0, canvasSize, canvasSize)
  
  
      // recorremos el mapa
      mapRowsCols.forEach((row, rowI) => {
        // el mapa renderizará los objetos que definimos en los emogis
        row.forEach((col, colI) => {
          const mapGame = emojis[col]
          const posX = elementsSize * (colI + 1)
          const posY = elementsSize * (rowI + 1)
  
          // el jugador iniciará en la posición donde este la puerta
          if(col === 'O') {
            // solo renerizará si NO hay ninguna posición asignada por los movimientos
            if (!playerPosition.x && !playerPosition.y) {
              playerPosition.x = posX
              playerPosition.y = posY
            }
          } 
          
          // preguntamos si la posición de la meta
          else if (col === 'I') {
            giftPosition.x = posX
            giftPosition.y = posY
          }
  
          // preguntamos la posición de los enemigos y la añadimos a un arreglo
          else if (col === 'X') {
            enemiesPositions.push({
              x: posX,
              y: posY,
            })
          }
  
          // renderizamos el mapa, los objetos y la posición de los objetos
          game.fillText(mapGame, posX, posY)
  
          // renderizamos las vidas
          showLives()
        })
      })
  
      // renderizamos al jugador en la posición inicial
      movePlayer()
    }
  }
}

function movePlayer() {
  if(game && playerPosition.x && playerPosition.y && giftPosition.x && giftPosition.y) {
    // hicimos colisión con la meta?
    const gifttColitionX = Math.ceil(playerPosition.x) === Math.ceil(giftPosition.x)
    const giftColitionY = Math.ceil(playerPosition.y) === Math.ceil(giftPosition.y)

    // cuando colisionemos con la meta
    if (gifttColitionX && giftColitionY) {
      levelWin()
    }

    // colisionamos con un enemigo?
    const enemyCollision = enemiesPositions.find(enemy => {
      const enemyCollisionX = Math.ceil(enemy.x) === Math.ceil(playerPosition.x ?? 0)
      const enemyCollisionY = Math.ceil(enemy.y) === Math.ceil(playerPosition.y ?? 0)
      return enemyCollisionX && enemyCollisionY
    })

    if (enemyCollision) {
      gameFail()
    }
    
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
  }
}

// ganar nivel
function levelWin() {
  // subir nivel
  level++
  // iniciar nivel
  startGame()
}

// ganar juego
function gameWin() {
  if(timeStart) {
    // paramos el timeInterval
    clearInterval(timeInterval)
    gameInit = false

    ModalGameWin.classList.remove('hidden')

    // obtenemos el tiempo record
    const recordTime: num = Number(localStorage.getItem('record_time'))
    
    // asignamos el tiempo que tardó el jugador en pasar el nivel
    const playerTime: num = Number(Date.now() - timeStart)
    
    // el tiempo record existe?
    if (recordTime) {
      // el record es mayor al tiempo del jugador?
      if(recordTime > playerTime) {
        // asignamos nuevo record que es igual al tiempo del jugador
        localStorage.setItem('record_time', String(playerTime))
        GameWinMessage.innerText = '🎉 Superaste tu record 🎉'
      } else {
        GameWinMessage.innerText = 'Sigue intentando superar tu record'
      }
    } else {
      // si no existe un record añadimos el record actual
      localStorage.setItem('record_time', String(playerTime))
      GameWinMessage.innerText = '¡Genial! Ahora puedes intentar superar tu record actual'
    }

    // mostramos el record
    showRecord()
    GameWinContinueBtn.addEventListener('click', ()=> { 
      level = 0
      lives = 3
      timeStart = undefined
      clearInterval(timeInterval)
      
      ModalGameWin.classList.add('hidden');
      ModalStartGameBtn.style.display = 'block'
    })
  }
}

// chocar con un enemigo
function gameFail() {
  // menos una vida
  lives--

  // vidas menor o igual a "0"?
  if (lives <= 0 ) {
    // reiniciamos el mapa, vidas = 3
    level = 0
    lives = 3
    timeStart = undefined
    clearInterval(timeInterval)
    gameInit = false

    ModalGameOver.classList.remove('hidden')
    ModalStartGameBtn.style.display = 'none'
    GameOverContinueBtn.addEventListener('click', ()=> { gameInit = true; ModalGameOver.classList.add('hidden'); startGame() })
    GameOverCancelBtn.addEventListener('click', ()=> { ModalGameOver.classList.add('hidden'); ModalStartGameBtn.style.display = 'block' })
  }

  // volver a la posición inicial
  playerPosition.x = undefined
  playerPosition.y = undefined
  startGame()
}

// cantidad de vidas
function showLives() {
  spanLives.innerHTML = emojis["HEART"].repeat(lives)
  spanLivesTwo.innerHTML = emojis["HEART"].repeat(lives)
}

// tiempo de juego
function showTime() {
  if(timeStart) {
    const currentTime = Date.now()
    const milliInterval = currentTime - timeStart

    const formattedTime = timeFormath(milliInterval)
    spanTime.innerHTML = formattedTime
    spanTimeTwo.innerHTML = formattedTime
  }
}

// mostrar el record
function showRecord() {
  const record: num = Number(localStorage.getItem('record_time')) || 0

  const formattedTime = timeFormath(record)
  spanRecord.innerHTML = formattedTime
  spanRecordTwo.innerHTML = formattedTime
}


