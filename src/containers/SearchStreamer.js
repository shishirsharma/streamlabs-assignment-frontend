import { connect } from 'react-redux'
import { selectStreamer } from '../actions'
//import { VisibilityFilters } from '../actions'
import SearchBox from '../components/SearchBox'

// const getVisibleTodos = (todos, filter) => {
//   switch (filter) {
//     case VisibilityFilters.SHOW_ALL:
//       return todos
//     case VisibilityFilters.SHOW_COMPLETED:
//       return todos.filter(t => t.completed)
//     case VisibilityFilters.SHOW_ACTIVE:
//       return todos.filter(t => !t.completed)
//     default:
//       throw new Error('Unknown filter: ' + filter)
//   }
// }

const mapStateToProps = state => ({
  ...state
  //todos: getVisibleTodos(state.todos, state.visibilityFilter)
})
//console.log('selectStreamer', selectStreamer);
const mapDispatchToProps = dispatch => ({
    selectStreamer: user => dispatch(selectStreamer.selectStreamer(user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox)
