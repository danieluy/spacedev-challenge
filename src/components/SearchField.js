import React from 'react'
import PropTypes from 'prop-types'
import { debounce as _debounce } from 'lodash'

class SearchField extends React.PureComponent {
  constructor(props) {
    super()
    this.debounced = _debounce(props.onSearch, (props.debounceTimeMs || 500))
  }
  handleChange(e) {
    this.debounced(e.target.value)
  }
  render() {
    return (
      <div className="search-field">
        <input type="text" placeholder="Search here :-)" onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}

export default SearchField

SearchField.propTypes = {
  query: PropTypes.string,
  debounceTimeMs: PropTypes.number
}