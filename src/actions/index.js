let nextPosition = 0;

export const addToList = id => ({
  type: 'ADD_TO_LIST',
  payload : {
    id,
    position: nextPosition++,
    dateAdded: Date.now()
  }  
})