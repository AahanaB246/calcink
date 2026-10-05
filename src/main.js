import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <canvas id="canvas"></canvas>
`

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1

  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

resizeCanvas()

window.addEventListener('resize', resizeCanvas)

let isDrawing = false

const strokes = []
let currentStroke = null

function getCanvasPoint(event) {
  const rect = canvas.getBoundingClientRect()

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

canvas.addEventListener('pointerdown', (event) => {
  isDrawing = true

  canvas.setPointerCapture(event.pointerId)

  const point = getCanvasPoint(event)

  currentStroke = {
    points: [point]
  }

  ctx.beginPath()
  ctx.moveTo(point.x, point.y)
})

canvas.addEventListener('pointermove', (event) => {
  if (!isDrawing) return

  const point = getCanvasPoint(event)

  currentStroke.points.push(point)

  ctx.lineTo(point.x, point.y)
  ctx.stroke()
})

canvas.addEventListener('pointerup', (event) => {
  finishStroke(event)
})

canvas.addEventListener('pointercancel', (event) => {
  finishStroke(event)
})

function finishStroke(event) {
  if (!isDrawing) return

  isDrawing = false

  if (currentStroke && currentStroke.points.length > 0) {
    strokes.push(currentStroke)
  }

  currentStroke = null

  if (canvas.hasPointerCapture(event.pointerId)) {
    canvas.releasePointerCapture(event.pointerId)
  }

  console.log('Total strokes:', strokes.length)
}