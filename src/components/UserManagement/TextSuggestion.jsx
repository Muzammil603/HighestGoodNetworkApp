import React from 'react';

class TextSuggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',

    };

  }


  render() {
    const options = this.props.list
    return (
      <React.Fragment>

        <input
          list={this.props.list}
          type="text"
          value={this.props.value}
          id={'search_' + this.props.id}
          style={this.props.style}
          onChange={this.onTextChange}
          placeholder={this.props.placeholder}
          className={this.props.className}

        />
        <datalist id={this.props.list} >
          {options.map((item, index) => {
            return (
              <option value={item} key={index}>
              </option>
            )
          })}
        </datalist>

      </React.Fragment>
    );
  }

  onTextChange = event => {
    this.props.searchCallback(event.target.value);
    this.setState({
      text: event.target.value,
    });
  };
}

export default TextSuggestion;