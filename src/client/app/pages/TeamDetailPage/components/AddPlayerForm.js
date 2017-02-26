import React from 'react';
import {observer} from 'mobx-react';
import {action, observable} from 'mobx';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  HelpBlock
} from 'react-bootstrap';
import {
  PlayerStore,
  ToastStore
} from '../../../stores';

@observer
class AddPlayerForm extends React.Component {

  @observable name            = '';
  @observable team            = '';
  @observable keeper          = '';
  @observable defending       = '';
  @observable playmaking      = '';
  @observable winger          = '';
  @observable passing         = '';
  @observable scoring         = '';
  @observable set_pieces      = '';
  @observable nameValid       = null;
  @observable keeperValid     = null;
  @observable defendingValid  = null;
  @observable playmakingValid = null;
  @observable wingerValid     = null;
  @observable passingValid    = null;
  @observable scoringValid    = null;
  @observable set_piecesValid = null;
              requiredText    = 'This field is required';

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.createPlayer = this.createPlayer.bind(this);
    this.resetValues  = this.resetValues.bind(this);
  }

  @action
  async createPlayer(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    try {
      let added = await PlayerStore.addPlayer({
        name: this.name,
        team: this.props.teamId,
        keeper: this.keeper,
        defending: this.defending,
        playmaking: this.playmaking,
        winger: this.winger,
        passing: this.passing,
        scoring: this.scoring,
        set_pieces: this.set_pieces,
      });

      ToastStore.addToastMessage(`Successfully added ${this.name}`);
      this.resetValues();
    }
    catch (err) {

    }

    this.props.toggleModal();
  }

  @action
  handleChange(e) {
    this[e.target.name] = e.target.value;
    this.validateElement(e.target.name);
  }

  @action
  resetValues() {
    this.name            = '';
    this.team            = '';
    this.keeper          = '';
    this.defending       = '';
    this.playmaking      = '';
    this.winger          = '';
    this.passing         = '';
    this.scoring         = '';
    this.set_pieces      = '';
    this.nameValid       = null;
    this.keeperValid     = null;
    this.defendingValid  = null;
    this.playmakingValid = null;
    this.wingerValid     = null;
    this.passingValid    = null;
    this.scoringValid    = null;
    this.set_piecesValid = null;
  }

  validateForm() {
    let nameValid       = this.validateElement('name');
    let keeperValid     = this.validateElement('keeper');
    let defendingValid  = this.validateElement('defending');
    let playmakingValid = this.validateElement('playmaking');
    let wingerValid     = this.validateElement('winger');
    let passingValid    = this.validateElement('passing');
    let scoringValid    = this.validateElement('scoring');
    let set_piecesValid = this.validateElement('set_pieces');

    return nameValid && keeperValid && defendingValid && playmakingValid &&
      passingValid && scoringValid && set_piecesValid;
  }

  @action
  validateElement(key) {
    if (!this[key]) {
      this[`${key}Valid`] = 'error';
    }
    else {
      this[`${key}Valid`] = null;
    }
    return this[key].length > 0;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.createPlayer}>
          <FormGroup
            controlId="name"
            validationState={this.nameValid}
          >
            <ControlLabel>Player name</ControlLabel>
            <FormControl
              type="text"
              value={this.name}
              placeholder="name"
              onChange={this.handleChange}
              name="name"
            />
            <HelpBlock>{this.nameValid ? this.requiredText : null}</HelpBlock>
          </FormGroup>
          <FormGroup
            controlId="keeper"
            validationState={this.keeperValid}
          >
            <ControlLabel>Keeper skill</ControlLabel>
            <FormControl
              type="number"
              value={this.keeper}
              placeholder="keeper skill"
              onChange={this.handleChange}
              name="keeper"
              min="0"
              max="20"
            />
            <HelpBlock>{this.keeperValid ? this.requiredText : null}</HelpBlock>
          </FormGroup>
          <FormGroup
            controlId="defending"
            validationState={this.defendingValid}
          >
            <ControlLabel>Defending skill</ControlLabel>
            <FormControl
              type="number"
              value={this.defending}
              placeholder="defending skill"
              onChange={this.handleChange}
              name="defending"
              min="0"
              max="20"
            />
            <HelpBlock>{this.defendingValid ? this.requiredText : null}</HelpBlock>
          </FormGroup>
          <FormGroup
            controlId="Playmaking"
            validationState={this.playmakingValid}
          >
            <ControlLabel>Playmaking skill</ControlLabel>
            <FormControl
              type="number"
              value={this.playmaking}
              placeholder="playmaking skill"
              onChange={this.handleChange}
              name="playmaking"
              min="0"
              max="20"
            />
            <HelpBlock>{this.playmakingValid ? this.requiredText : null}</HelpBlock>
          </FormGroup>
          <FormGroup
            controlId="winger"
            validationState={this.wingerValid}
          >
            <ControlLabel>Winger skill</ControlLabel>
            <FormControl
              type="number"
              value={this.winger}
              placeholder="winger skill"
              onChange={this.handleChange}
              name="winger"
              min="0"
              max="20"
            />
            <HelpBlock>{this.wingerValid ? this.requiredText : null}</HelpBlock>
          </FormGroup>
          <FormGroup
            controlId="passing"
            validationState={this.passingValid}
          >
            <ControlLabel>Passing skill</ControlLabel>
            <FormControl
              type="number"
              value={this.passing}
              placeholder="passing skill"
              onChange={this.handleChange}
              name="passing"
              min="0"
              max="20"
            />
            <HelpBlock>{this.passingValid ? this.requiredText : null}</HelpBlock>
          </FormGroup>
          <FormGroup
            controlId="scoring"
            validationState={this.scoringValid}
          >
            <ControlLabel>Scoring skill</ControlLabel>
            <FormControl
              type="number"
              value={this.scoring}
              placeholder="scoring skill"
              onChange={this.handleChange}
              name="scoring"
              min="0"
              max="20"
            />
            <HelpBlock>{this.scoringValid ? this.requiredText : null}</HelpBlock>
          </FormGroup>
          <FormGroup
            controlId="set_pieces"
            validationState={this.set_piecesValid}
          >
            <ControlLabel>Set pieces skill</ControlLabel>
            <FormControl
              type="number"
              value={this.set_pieces}
              placeholder="Set pieces skill"
              onChange={this.handleChange}
              name="set_pieces"
              min="0"
              max="20"
            />
            <HelpBlock>{this.set_piecesValid ? this.requiredText : null}</HelpBlock>
          </FormGroup>
          <div className="pull-right">
            <Button onClick={this.props.toggleModal}>Close</Button>
            <Button bsStyle="primary" type="submit">Save</Button>
          </div>
        </form>
      </div>
    )
  }
}

export default AddPlayerForm;