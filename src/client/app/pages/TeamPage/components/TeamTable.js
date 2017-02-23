import React from 'react';
import {observer} from'mobx-react';
import {
  action,
  observable
} from 'mobx';
import {
  Table,
  Button
} from 'react-bootstrap';
import {
  MyModal
} from '../../../components';
import {
  TeamStore,
  ToastStore
} from '../../../stores';
import styles from './TeamTable.scss';
import {CreateTeamForm} from './';


@observer
class TeamTable extends React.Component {

  @observable showModal = false;
  @observable modalTitle = '';
  @observable modalBody = '';
  @observable modalFooter = '';

  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.showDeleteWarning = this.showDeleteWarning.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
    this.showAddTeam = this.showAddTeam.bind(this);
  }

  componentWillMount() {
    this.showModal = false;
    this.modalTitle = '';
    this.modalBody = '';
    this.modalFooter = '';
  }

  @action
  async deleteTeam(id) {
    await TeamStore.deleteTeam(id);
    this.toggleModal();
  }

  @action
  showAddTeam() {
    this.modalTitle = 'Add team';
    this.modalBody = <CreateTeamForm toggleModal={this.toggleModal}/>;
    this.modalFooter = null;
    this.toggleModal();
  }

  @action
  showDeleteWarning(team) {
    this.modalTitle = 'Confirm delete';
    this.modalBody = `Are you sure you want to delete ${team.team_name}?`;
    this.modalFooter = (
      <div>
        <Button onClick={this.toggleModal}>Cancel</Button>
        <Button bsStyle="danger" onClick={() => this.deleteTeam(team.id)}>Delete</Button>
      </div>
    );
    this.toggleModal();
  }

  @action
  toggleModal() {
    console.log('toggle modal');
    this.showModal = !this.showModal;
  }

  render() {
    return (
      <div>
        <Table
          responsive
          striped
          bordered
        >
          <thead>
          <tr colSpan="3">
            <div className={styles.addTeamButtonContainer}>
              <Button
                bsStyle="success"
                onClick={this.showAddTeam}
              >
                Add team
              </Button>
            </div>
          </tr>
          <tr>
            <th>Team name</th>
            <th>Hattrick id</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {this.props.teams.map(team => {
            return (
              <tr key={team.id}>
                <td>{team.team_name}</td>
                <td>{team.hattrick_team_id}</td>
                <td>
                  <Button
                    bsStyle="success"
                    bsSize="small"
                  >
                    <span className="glyphicon glyphicon-pencil"/>
                  </Button>
                  <Button
                    bsStyle="danger"
                    bsSize="small"
                    onClick={() => this.showDeleteWarning(team)}
                  >
                    <span className="glyphicon glyphicon-trash"/>
                  </Button>
                </td>
              </tr>
            )
          })}
          </tbody>
        </Table>
        <MyModal
          show={this.showModal}
          title={this.modalTitle}
          body={this.modalBody}
          footer={this.modalFooter}
        />
      </div>
    )
  }
}

export default TeamTable;