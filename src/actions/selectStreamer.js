/*
 src/actions/simpleAction.js
*/
export const selectStreamer = (user) => dispatch => {
    dispatch({
     type: 'SELECT_STREAMER',
     user
    })
   }