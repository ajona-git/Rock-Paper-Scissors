export function saveGameToLocalStorage(score){
  localStorage.setItem('score', JSON.stringify(score))
}
