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
import {
  CreateTeamForm,
  EditTeamForm,
  DeleteFooter
} from './';
import {Link} from 'react-router';


@observer
class TeamTable extends React.Component {

  @observable showModal   = false;
  @observable modalTitle  = '';
  @observable modalBody   = '';
  @observable modalFooter = '';

  constructor(props) {
    super(props);

    this.toggleModal       = this.toggleModal.bind(this);
    this.showDeleteWarning = this.showDeleteWarning.bind(this);
    this.deleteTeam        = this.deleteTeam.bind(this);
    this.showAddTeam       = this.showAddTeam.bind(this);
    this.showEditTeam      = this.showEditTeam.bind(this);
  }

  @action
  componentWillMount() {
    this.showModal   = false;
    this.modalTitle  = '';
    this.modalBody   = '';
    this.modalFooter = '';
  }

  @action
  async deleteTeam(team) {
    await TeamStore.deleteTeam(team.id);
    this.toggleModal();
    ToastStore.addToastMessage(`${team.team_name} was deleted`);
  }

  @action
  showAddTeam() {
    this.modalTitle  = 'Add team';
    this.modalBody   = <CreateTeamForm toggleModal={action(this.toggleModal)}/>;
    this.modalFooter = null;
    this.toggleModal();
  }

  @action
  showDeleteWarning(team) {
    this.modalTitle  = 'Confirm delete';
    this.modalBody   = `Are you sure you want to delete ${team.team_name}?`;
    this.modalFooter = <DeleteFooter cancel={action(this.toggleModal)} delete={action(() => this.deleteTeam(team))}/>;

    this.toggleModal();
  }

  @action
  showEditTeam(team) {
    this.modalTitle  = `Edit ${team.team_name}`;
    this.modalBody   = <EditTeamForm toggleModal={action(() => this.toggleModal())} team={team}/>;
    this.modalFooter = null;
    this.toggleModal();
  }

  @action
  toggleModal() {
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
          <tr>
            <th colSpan="3" className={styles.addTeamButtonContainer}>
              <Button
                bsStyle="success"
                onClick={this.showAddTeam}
              >
                Add team
              </Button>
            </th>
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
                <td>
                  <Link to={`home/team/${team.id}`}>
                    {team.team_name}
                  </Link>
                </td>
                <td>{team.hattrick_team_id}</td>
                <td>
                  <Button
                    bsStyle="success"
                    bsSize="small"
                    onClick={() => this.showEditTeam(team)}
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