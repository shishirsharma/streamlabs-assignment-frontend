export default (state = {}, action) => {
  switch (action.type) {
    case 'SIMPLE_ACTION':
      return {
        result: action.payload
      }
    case 'SELECT_STREAMER':
      return {
        selectedUser: action.user
      }
    default:
      return state
  }
}