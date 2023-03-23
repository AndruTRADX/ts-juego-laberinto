export default function timeFormath(time: number): string {
  const minutes = (Math.floor(time / 1000 / 60)).toString().padStart(2, '0')
  const seconds = (Math.floor(time / 1000) % 60).toString().padStart(2, '0')
  const miliSeconds = (Math.floor(time % 1000 / 100)).toString().padStart(1, '0')

  return `${minutes}:${seconds}:${miliSeconds}`
}