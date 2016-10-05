// const uid = () => Math.random().toString(34).slice(2);

export function setActiveField(id) {
  return {
    type: 'SET_ACTIVE_FIELD',
    payload: id
  };
}

