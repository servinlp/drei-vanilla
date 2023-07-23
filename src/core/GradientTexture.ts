import { Texture, WebGLRenderer } from 'three'

type Props = {
  gl: WebGLRenderer
  stops: Array<number>
  colors: Array<string>
  attach?: string
  size?: number
} & Texture

export function GradientTexture({ gl, stops, colors, size = 1024, ...props }: Props) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!
  canvas.width = 16
  canvas.height = size
  const gradient = context.createLinearGradient(0, 0, 0, size)
  let i = stops.length
  while (i--) {
    gradient.addColorStop(stops[i], colors[i])
  }
  context.fillStyle = gradient
  context.fillRect(0, 0, 16, size)
  const texture = new Texture(canvas)
  texture.needsUpdate = true
  texture.encoding = gl.outputEncoding
  Object.assign(texture, props)
  return texture
}
