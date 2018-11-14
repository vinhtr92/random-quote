import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

class RandomQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: [],
      itemRandom: {
        author: "Antoine de Saint-Exupery ",
        quote:
          "Tell me who admires and loves you, and I will tell you who you are."
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://talaikis.com/api/quotes/")
      .then(res => {
        if (res.status === 200) {
          const { data } = res;
          this.setState({
            quote: data
          });
          console.log(this.state.quote.length - 1);
        }
      })
      .catch(err => console.log(err));
  }

  handleChange = () => {
    let itemLastPos = this.state.quote.length - 1;
    const random = ((from, to) => Math.floor(Math.random() * to + from))(
      0,
      itemLastPos
    );

    this.setState({
      itemRandom: this.state.quote[random]
    });
    console.log(this.state.itemRandom);
    console.log(this.state);
  };

  render() {
    const { author, quote } = this.state.itemRandom;

    return (
      <div>
        <h2> {author} </h2>
        <div> {quote} </div>

        <button className="randomBtn" onClick={this.handleChange}>
          Random!
        </button>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>

//       <button className="randomBtn" onClick={handleChange}>
//         Random!
//       </button>
//     </div>
//   );
// }

const rootElement = document.getElementById("root");
ReactDOM.render(<RandomQuote />, rootElement);
