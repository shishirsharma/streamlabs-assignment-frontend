import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import auth from '../auth'

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
];

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => { }, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            ),
        )}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
      const keep =
        count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}


const styles = theme => ({
  root: {
    // height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class SearchBox extends React.Component {
  state = {
    single: '',
    popper: '',
    suggestions: [],
  };
  
  handleSuggestionsFetchRequested = ({ value }) => {
    let _this = this;
    // this.setState({
    //   suggestions: getSuggestions(value),
    // });

    // Url of your website that process the data and returns a
    let url = `https://api.twitch.tv/kraken/search/channels`;
    console.log('Query', value)
    axios({
      method: 'get',
      url: url,
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'ofbe0u8pgfr3e7g08l1kmv5y48mhpg'
      },
      params: {
        'query': value,
      },
      responseType: 'json'
    }).then(function (response) {
      console.log('response', response)
      console.log('response.data.channels', response.data.channels)
      let channels = response.data.channels.map(c => ({
        label: c.display_name,
        value: c._id,
        data: c
      }));
      console.log('mapped', channels);
      _this.setState({
        suggestions: channels
      });
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  handleSuggestionValue = (suggestion) => {
    console.log('SearchBox handleSuggestionValue', suggestion, auth);
    this.props.selectStreamer(suggestion)
    let value = {}
    // Url of your website that process the data and returns a
    let url = process.env.REACT_APP_EVENT_SUBSCRIBE_URL;
    axios({
      method: 'get',
      url: url,
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'ofbe0u8pgfr3e7g08l1kmv5y48mhpg',
        'X-Access-Token': auth.accessToken
      },
      params: {
        'user_id': suggestion.data._id,
      }
    }).then(function (response) {
      console.log('response', response)
      // let channels = response.data.channels.map(c => ({
      //   label: c.display_name,
      //   value: c._id,
      //   data: c
      // }));
      // console.log('mapped', channels);
      // _this.setState({
      //   suggestions: channels
      // });
    }).catch(function (error) {
      // handle error
      console.log(error);
    });

    return suggestion.label;
  };

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue: this.handleSuggestionValue,
      renderSuggestion,
    };

    return (
      <div>
        <div className={classes.root}>
          <Autosuggest
            {...autosuggestProps}
            inputProps={{
              classes,
              placeholder: 'Search',
              value: this.state.single,
              onChange: this.handleChange('single'),
            }}
            theme={{
              container: classes.container,
              suggestionsContainerOpen: classes.suggestionsContainerOpen,
              suggestionsList: classes.suggestionsList,
              suggestion: classes.suggestion,
            }}
            renderSuggestionsContainer={options => (
              <Paper {...options.containerProps} square>
                {options.children}
              </Paper>
            )}
          />
        </div>

      </div>
    );
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired,
  selectStreamer: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchBox);



// import React from 'react';
// import PropTypes from 'prop-types';
// import deburr from 'lodash/deburr';
// import Downshift from 'downshift';
// import { withStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Paper from '@material-ui/core/Paper';
// import MenuItem from '@material-ui/core/MenuItem';
// import Chip from '@material-ui/core/Chip';

// import axios from 'axios'

// const suggestions = [
//     { label: 'Afghanistan' },
//     { label: 'Aland Islands' },
//     { label: 'Albania' },
//     { label: 'Algeria' },
//     { label: 'American Samoa' },
//     { label: 'Andorra' },
//     { label: 'Angola' },
//     { label: 'Anguilla' },
//     { label: 'Antarctica' },
//     { label: 'Antigua and Barbuda' },
//     { label: 'Argentina' },
//     { label: 'Armenia' },
//     { label: 'Aruba' },
//     { label: 'Australia' },
//     { label: 'Austria' },
//     { label: 'Azerbaijan' },
//     { label: 'Bahamas' },
//     { label: 'Bahrain' },
//     { label: 'Bangladesh' },
//     { label: 'Barbados' },
//     { label: 'Belarus' },
//     { label: 'Belgium' },
//     { label: 'Belize' },
//     { label: 'Benin' },
//     { label: 'Bermuda' },
//     { label: 'Bhutan' },
//     { label: 'Bolivia, Plurinational State of' },
//     { label: 'Bonaire, Sint Eustatius and Saba' },
//     { label: 'Bosnia and Herzegovina' },
//     { label: 'Botswana' },
//     { label: 'Bouvet Island' },
//     { label: 'Brazil' },
//     { label: 'British Indian Ocean Territory' },
//     { label: 'Brunei Darussalam' },
// ];

// function renderInput(inputProps) {
//     const { InputProps, classes, ref, ...other } = inputProps;

//     return (
//         <TextField
//             InputProps={{
//                 inputRef: ref,
//                 classes: {
//                     root: classes.inputRoot,
//                     input: classes.inputInput,
//                 },
//                 ...InputProps,
//             }}
//             {...other}
//         />
//     );
// }

// function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
//     const isHighlighted = highlightedIndex === index;
//     const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

//     return (
//         <MenuItem
//             {...itemProps}
//             key={suggestion.label}
//             selected={isHighlighted}
//             component="div"
//             style={{
//                 fontWeight: isSelected ? 500 : 400,
//             }}
//         >
//             {suggestion.label}
//         </MenuItem>
//     );
// }
// renderSuggestion.propTypes = {
//     highlightedIndex: PropTypes.number,
//     index: PropTypes.number,
//     itemProps: PropTypes.object,
//     selectedItem: PropTypes.string,
//     suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
// };




// const styles = theme => ({
//     root: {
//         flexGrow: 1,
//         height: 250,
//     },
//     container: {
//         flexGrow: 1,
//         position: 'relative',
//     },
//     paper: {
//         position: 'absolute',
//         zIndex: 1,
//         marginTop: theme.spacing.unit,
//         left: 0,
//         right: 0,
//     },
//     chip: {
//         margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
//     },
//     inputRoot: {
//         flexWrap: 'wrap',
//     },
//     inputInput: {
//         width: 'auto',
//         flexGrow: 1,
//     },
//     divider: {
//         height: theme.spacing.unit * 2,
//     },
// });

// class SearchBox extends React.Component {
//     render() {
//         return (
//             <Downshift
//                 onChange={selection =>
//                     alert(
//                         selection
//                             ? `You selected ${itemToString(selection)}`
//                             : 'selection cleared',
//                     )
//                 }
//                 itemToString={itemToString}
//             >
//                 {({
//                     getLabelProps,
//                     getInputProps,
//                     getToggleButtonProps,
//                     getMenuProps,
//                     getItemProps,
//                     isOpen,
//                     clearSelection,
//                     selectedItem,
//                     inputValue,
//                     highlightedIndex,
//                 }) => (
//                         <div {...css({ width: 250, margin: 'auto' })}>
//                             <Label {...getLabelProps()}>Find a Star Wars character</Label>
//                             <div {...css({ position: 'relative' })}>
//                                 <Input
//                                     {...getInputProps({
//                                         isOpen,
//                                         placeholder: 'Enter a name',
//                                     })}
//                                 />
//                                 {selectedItem ? (
//                                     <ControllerButton
//                                         onClick={clearSelection}
//                                         aria-label="clear selection"
//                                     >
//                                         <XIcon />
//                                     </ControllerButton>
//                                 ) : (
//                                         <ControllerButton {...getToggleButtonProps()}>
//                                             <ArrowIcon isOpen={isOpen} />
//                                         </ControllerButton>
//                                     )}
//                             </div>
//                             <div {...css({ position: 'relative' })}>
//                                 <Menu {...getMenuProps({ isOpen })}>
//                                     {isOpen
//                                         ? getItems(inputValue).map((item, index) => (
//                                             <Item
//                                                 key={item.id}
//                                                 {...getItemProps({
//                                                     item,
//                                                     index,
//                                                     isActive: highlightedIndex === index,
//                                                     isSelected: selectedItem === item,
//                                                 })}
//                                             >
//                                                 {itemToString(item)}
//                                             </Item>
//                                         ))
//                                         : null}
//                                 </Menu>
//                             </div>
//                         </div>
//                     )}
//             </Downshift>

//         )
//     }
// }

// SearchBox.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(SearchBox);


// // import React from 'react';
// // import axios from 'axios';

// // // Import the Autocomplete Component
// // // import Autocomplete from 'react-autocomplete';
// // import Downshift from 'downshift'

// // export default class SearchBox extends React.Component {

// //     constructor(props, context) {
// //         super(props, context);

// //         // Set initial State
// //         this.state = {
// //             // Current value of the select field
// //             value: "",
// //             // Data that will be rendered in the autocomplete
// //             autocompleteData: [
// //                 {
// //                     label: 'Apple',
// //                     value: 1
// //                 },
// //                 {
// //                     label: 'Microsoft',
// //                     value: 2
// //                 },
// //                 {
// //                     label: 'Me, Myself and I',
// //                     value: 3
// //                 }
// //             ]
// //         };

// //         // Bind `this` context to functions of the class
// //         this.onChange = this.onChange.bind(this);
// //         this.onSelect = this.onSelect.bind(this);
// //         this.getItemValue = this.getItemValue.bind(this);
// //         this.renderItem = this.renderItem.bind(this);
// //         this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
// //     }

// //     /**
// //      * Updates the state of the autocomplete data with the remote data obtained via AJAX.
// //      * 
// //      * @param {String} searchText content of the input that will filter the autocomplete data.
// //      * @return {Nothing} The state is updated but no value is returned
// //      */
// //     retrieveDataAsynchronously(searchText) {
// //         let _this = this;

// //         // Url of your website that process the data and returns a
// //         let url = `https://api.twitch.tv/kraken/search/channels?query=${searchText}`;

// //         axios({
// //             method: 'get',
// //             url: url,
// //             headers: {
// //                 'Accept': 'application/vnd.twitchtv.v5+json',
// //                 'Client-ID': 'ofbe0u8pgfr3e7g08l1kmv5y48mhpg'
// //             },
// //             responseType: 'json'
// //         }).then(function (response) {
// //             console.log('response', response)            
// //             console.log('response.data.channels', response.data.channels)
// //             let channels = response.data.channels.map(c => ({
// //                 label: c.display_name,
// //                 value: c._id,
// //                 data: c
// //             }));
// //             console.log('mapped', channels);
// //             _this.setState({
// //                 autocompleteData: channels
// //             });
// //         });
// //         // Configure a basic AJAX request to your server side API
// //         // that returns the data according to the sent text
// //         // let xhr = new XMLHttpRequest();
// //         // xhr.open('GET', url, true);
// //         // xhr.responseType = 'json';
// //         // xhr.onload = () => {
// //         //     let status = xhr.status;

// //         //     if (status == 200) {
// //         //         // In this example we expects from the server data with the structure of:
// //         //         // [
// //         //         //    {
// //         //         //        label: "Some Text",
// //         //         //        value: 1,
// //         //         //    },
// //         //         //    {
// //         //         //        label: "Some Other Text",
// //         //         //        value: 1,
// //         //         //    },
// //         //         // ]
// //         //         // But you can obviously change the render data :)

// //         //         // Update the state with the remote data and that's it !
// //         //         _this.setState({
// //         //             autocompleteData: xhr.response
// //         //         });

// //         //         // Show response of your server in the console
// //         //         console.log(xhr.response);
// //         //     } else {
// //         //         console.error("Cannot load data from remote source");
// //         //     }
// //         // };

// //         // xhr.send();
// //     }


// //     /**
// //      * Callback triggered when the user types in the autocomplete field
// //      * 
// //      * @param {Event} e JavaScript Event
// //      * @return {Event} Event of JavaScript can be used as usual.
// //      */
// //     onChange(e) {
// //         this.setState({
// //             value: e.target.value
// //         });
// //         this.retrieveDataAsynchronously(e.target.value);

// //         console.log("The Input Text has changed to ", e.target.value);
// //     }

// //     /**
// //      * Callback triggered when the autocomplete input changes.
// //      * 
// //      * @param {Object} val Value returned by the getItemValue function.
// //      * @return {Nothing} No value is returned
// //      */
// //     onSelect(val) {
// //         this.setState({
// //             value: val
// //         });

// //         console.log("Option from 'database' selected : ", val);
// //     }

// //     /**
// //      * Define the markup of every rendered item of the autocomplete.
// //      * 
// //      * @param {Object} item Single object from the data that can be shown inside the autocomplete
// //      * @param {Boolean} isHighlighted declares wheter the item has been highlighted or not.
// //      * @return {Markup} Component
// //      */
// //     renderItem(item, isHighlighted) {
// //         // return (
// //         //     <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
// //         //         {item.label}
// //         //     </div>
// //         // );
// //         return (
// //             <div className="menu">
// //               {item.label}
// //             </div>
// //         );
// //     }

// //     /**
// //      * Define which property of the autocomplete source will be show to the user.
// //      * 
// //      * @param {Object} item Single object from the data that can be shown inside the autocomplete
// //      * @return {String} val
// //      */
// //     getItemValue(item) {
// //         // You can obviously only return the Label or the component you need to show
// //         // In this case we are going to show the value and the label that shows in the input
// //         // something like "1 - Microsoft"
// //         return `${item.value} - ${item.label}`;
// //     }

// //     render() {

// //         // <Autocomplete
// //         //     inputProps={{ id: 'states-autocomplete' }}
// //         //     wrapperStyle={{ position: 'relative', display: 'inline-block' }}
// //         //     value={this.state.value}
// //         //     items={this.state.unitedStates}
// //         //     getItemValue={(item) => item.name}
// //         //     onSelect={(value, item) => {
// //         //         // set the menu to only the selected item
// //         //         this.setState({ value, unitedStates: [item] })
// //         //         // or you could reset it to a default list again
// //         //         // this.setState({ unitedStates: getStates() })
// //         //     }}
// //         //     onChange={(event, value) => {
// //         //         this.setState({ value })
// //         //         clearTimeout(this.requestTimer)
// //         //         this.requestTimer = fakeRequest(value, (items) => {
// //         //             this.setState({ unitedStates: items })
// //         //         })
// //         //     }}
// //         //     renderMenu={children => (
// //         //         <div className="menu">
// //         //             {children}
// //         //         </div>
// //         //     )}
// //         //     renderItem={(item, isHighlighted) => (
// //         //         <div
// //         //             className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
// //         //             key={item.abbr}
// //         //         >{item.name}</div>
// //         //     )}
// //         // />
// //         return (
// //             <Autocomplete
// //                 getItemValue={this.getItemValue}
// //                 items={this.state.autocompleteData}
// //                 renderItem={this.renderItem}
// //                 value={this.state.value}
// //                 onChange={this.onChange}
// //                 onSelect={this.onSelect}
// //             />
// //         );
// //     }
// // }
