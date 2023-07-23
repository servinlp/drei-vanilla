import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
import { GradientTexture } from '../../src/core'
import { Setup } from '../Setup'
import { Meta } from '@storybook/html'
import { OrbitControls } from 'three-stdlib'

export default {
  title: 'Abstractions/GradientTexture',
  argTypes: {
    colorOne: { control: 'color' },
    colorTwo: { control: 'color' },
  },
} as Meta

export const GradientTextureStory = (args) => {
  const { colorOne, colorTwo } = args
  console.log(colorOne, colorTwo)

  const { renderer, scene, camera } = Setup()
  new OrbitControls(camera, renderer.domElement)

  const geometry = new PlaneGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({
    side: DoubleSide,
    map: GradientTexture({
      gl: renderer,
      stops: [0, 1],
      colors: [colorOne, colorTwo],
    }),
  })

  const mesh = new Mesh(geometry, material)
  scene.add(mesh)

  return renderer.domElement
}

GradientTextureStory.storyName = 'Default'
GradientTextureStory.args = {
  colorOne: '#000',
  colorTwo: '#fff',
}
