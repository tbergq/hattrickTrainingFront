import React from 'react';
import {observer} from'mobx-react';
import {
  action,
  observable
} from 'mobx';
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import {
  TeamStore,
  ToastStore
} from '../../../stores';

@observer
class EditTeamForm extends React.Component {

  @observable team_name = '';
  @observable hattrick_team_id = '';
  @observable id;

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.submitTeam = this.submitTeam.bind(this);
  }

  componentWillMount() {
    if (this.props.team) {
      this.team_name = this.props.team.team_name;
      this.hattrick_team_id = this.props.team.hattrick_team_id;
      this.id = this.props.team.id;
    }
    else {
      ToastStore.addToastMessage('Team not ready when component mounts');
    }
  }

  @action
  onChange(e) {
    this[e.target.name] = e.target.value;
  }

  @action
  async submitTeam(e) {
    e.preventDefault();

    if (!this.team_name) {
      ToastStore.addToastMessage('Team name is missing, it is required field');
      return;
    }

    await TeamStore.updateTeam({
      id: this.id,
      team_name: this.team_name,
      hattrick_team_id: this.hattrick_team_id
    });

    this.props.toggleModal();
    ToastStore.addToastMessage(`${this.team_name} was successfully updated`);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitTeam}>
          <FormGroup
            controlId="teamName"
          >
            <ControlLabel>Team name</ControlLabel>
            <FormControl
              type="text"
              value={this.team_name}
              placeholder="Team name"
              onChange={this.onChange}
              name="team_name"
            />
          </FormGroup>
          <FormGroup
            controlId="teamName"
          >
            <ControlLabel>Hattrick team id(optional)</ControlLabel>
            <FormControl
              type="text"
              value={this.hattrick_team_id}
              placeholder="Hattrick team id"
              onChange={this.onChange}
              name="hattrick_team_id"
            />
          </FormGroup>
          <FormGroup>
            <div className="pull-right">
              <Button onClick={this.props.toggleModal}>Cancel</Button>
              <Button
                bsStyle="primary"
                type="submit"
              >
                Update
              </Button>
            </div>
          </FormGroup>
        </form>
      </div>
    )
  }
}

export default EditTeamForm;