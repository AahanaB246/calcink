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

function getCanvasPoint(event) {
  const rect = canvas.getBoundingClientRect()

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

canvas.addEventListener('pointerdown', (event) => {
  isDrawing = true

  const point = getCanvasPoint(event)

  ctx.beginPath()
  ctx.moveTo(point.x, point.y)
})

canvas.addEventListener('pointermove', (event) => {
  if (!isDrawing) return

  const point = getCanvasPoint(event)

  ctx.lineTo(point.x, point.y)
  ctx.stroke()
})

canvas.addEventListener('pointerup', () => {
  isDrawing = false
})

canvas.addEventListener('pointerleave', () => {
  isDrawing = false
})