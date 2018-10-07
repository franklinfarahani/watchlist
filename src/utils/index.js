import genres from '../config/genreIds.json'

export function imagesLoaded(parentNode) {
  const imgElements = [...parentNode.querySelectorAll("img")];
  for (let i = 0; i < imgElements.length; i += 1) {
    const img = imgElements[i];
    if (!img.complete) {
      return false;
    }
  }
  return true;
}

export function getGenreName(id){
  return genres[genres.findIndex(genre => genre.id === id)].name
}

export function formatRuntime(runtime){
  return {
    hours: Math.floor(runtime / 60),
    minutes: runtime % 60
  }
}

export function formatDate (date){
  
  let month;

  switch (date.split("-")[1]) {
    case '01':
      month = 'January'
      break;
    case '02':
      month = 'February'
      break;
    case '03':
      month = 'March'
      break;
    case '04':
      month = 'April'
      break;
    case '05':
      month = 'May'
      break;
    case '06':
      month = 'June'
      break;
    case '07':
      month = 'July'
      break;
    case '08':
      month = 'August'
      break;
    case '09':
      month = 'September'
      break;
    case '10':
      month = 'October'
      break;
    case '11':
      month = 'November'
      break;
    case '12':
      month = 'December'
      break;
    default:
    break;
  }
  
  return {
    year: date.split("-")[0],
    month,
    day: date.split("-")[2]
  }
}