import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: 0,
    cardAttr2: 0,
    cardAttr3: 0,
    cardImage: '',
    cardRare: '',
    cardTrunfo: false,
    isSaveButtonDisabled: true,
    button: [],
    data: [],
    filter: false,
    rare: 'todas',
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox'
      ? target.checked : target.value;
    this.setState(
      { [name]: value,
      },
      () => this.validateButton(),
    );
  };

  validateButton = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
    } = this.state;
    const maxlength = 90;
    const minLength = 0;
    const maxLengthTotal = 210;
    const attr1Input = minLength <= cardAttr1 && cardAttr1 <= maxlength;
    const attr2Input = minLength <= cardAttr2 && cardAttr2 <= maxlength;
    const attr3Input = minLength <= cardAttr3 && cardAttr3 <= maxlength;
    const sumCardAttr = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3)
<= maxLengthTotal;

    const cardsTypes = cardName.length > 0
      && cardDescription.length > 0
      && cardImage.length > 0
      && cardRare.length > 0
      && sumCardAttr
      && attr1Input
      && attr2Input
      && attr3Input;

    this.setState({
      isSaveButtonDisabled: !cardsTypes,
    });
  };

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;
    const cardsTypes = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    this.setState(
      (element) => ({
        cardName: '',
        cardDescription: '',
        cardImage: '',
        cardAttr1: '0',
        cardAttr2: '0',
        cardAttr3: '0',
        cardRare: 'normal',
        cardTrunfo: false,
        isSaveButtonDisabled: true,
        button: [...element.button, cardsTypes],
      }),
      () => this.saveElements(),
    );
  };

  saveElements = () => {
    const { button } = this.state;
    return button.some((i) => i.cardTrunfo === true);
  };

  filterElements = ({ target }) => {
    const { button } = this.state;
    const name = target.value;
    const cards = button.filter((index) => index.cardName.includes(name));
    this.setState({
      data: cards,
      filter: name !== '',
    });
  };

  filterElementsSecond = (event) => {
    const { button } = this.state;
    const saveValue = event.target.value;
    const filterData = button.filter((index) => index.cardRare === saveValue);
    this.setState({
      rare: saveValue,
      data: filterData,
      filter: event.target.value !== 'todas',
    });
  };

  removeElements(element) {
    const { button } = this.state;
    const saveSentence = button.filter((item, index) => index !== element);
    this.setState(
      () => ({ button: saveSentence }),
      () => this.saveElements(),
    );
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      button: result,
      getForms,
      filter,
      data,
      rare,
    } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ this.saveElements() }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <input
          data-testid="name-filter"
          type="text"
          value={ getForms }
          onChange={ (element) => this.filterElements(element) }
        />
        <select
          data-testid="rare-filter"
          value={ rare }
          onChange={ (element) => this.filterElementsSecond(element) }
        >
          <option value="normal">normal</option>
          <option value="raro">raro</option>
          <option value="muito raro">muito raro</option>
          <option value="todas">todas</option>
        </select>
        {filter
          ? data.map((element, index) => (
            <div key={ index }>
              <Card
                cardName={ element.cardName }
                cardDescription={ element.cardDescription }
                cardAttr1={ element.cardAttr1 }
                cardAttr2={ element.cardAttr2 }
                cardAttr3={ element.cardAttr3 }
                cardImage={ element.cardImage }
                cardRare={ element.cardRare }
                cardTrunfo={ element.cardTrunfo }
              />
            </div>
          )) : result.map((element, index) => (
            <div key={ index }>
              <Card
                cardName={ element.cardName }
                cardDescription={ element.cardDescription }
                cardAttr1={ element.cardAttr1 }
                cardAttr2={ element.cardAttr2 }
                cardAttr3={ element.cardAttr3 }
                cardImage={ element.cardImage }
                cardRare={ element.cardRare }
                cardTrunfo={ element.cardTrunfo }
              />
              <button
                data-testid="delete-button"
                type="button"
                onClick={ () => this.removeElements(index) }
              >
                remover
              </button>
            </div>
          ))}
      </div>
    );
  }
}

export default App;
