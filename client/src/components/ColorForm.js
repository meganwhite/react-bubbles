import React from 'react';
import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';

class ColorForm extends React.Component {
  state = {
    colorDetail: {
        color: '',
        code: '',
    }
  };

  handleChange = e => {
    this.setState({
      colorDetail: {
        ...this.state.colorDetail,
        [e.target.name]: e.target.value
      }
    })
  };

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state.colorDetail);
    axiosWithAuth()
      .post('http://localhost:5000/api/colors', this.state.colorDetail)
      .then(res => {
        axiosWithAuth()
        .get('http://localhost:5000/api/colors')
        .then(res => {
          this.setState({
            colorDetail: res.data
          });
        })
        .catch(err => console.log(err.response));
          
      })
      .catch(err => console.log(err.response));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
            <label>
                color name:
                <input
                    type="text"
                    name="color"
                    placeholder="name"
                    value={this.state.colorDetail.color}
                    onChange={this.handleChange}
                />
            </label>
            <label>
                <input
                    type="text"
                    name="code"
                    placeholder="hex code"
                    value={this.state.colorDetail.code.hex}
                    onChange={this.handleChange}
                />
            </label>
            <button>Add Color</button>
        </form>
      </div>
    );
  }
}

export default ColorForm;