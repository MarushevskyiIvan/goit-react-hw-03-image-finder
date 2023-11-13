import { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  Searchbar,
} from './Search.styled';

export class SearchBar extends Component {
  state = {
    name: '',
  };
  handleChange = evt => {
    const { name, value } = evt.currentTarget;

    this.setState({ [name]: value });
  };

  formSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.name);
  };
  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.formSubmit}>
          <SearchFormButton type="submit">
            <span>
              <FcSearch />
            </span>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            placeholder="Search images and photos"
            name="name"
            onChange={this.handleChange}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}
