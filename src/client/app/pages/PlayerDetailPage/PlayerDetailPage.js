import React from 'react';
import {observer} from 'mobx-react';
import {action, observable} from 'mobx';
import {
  PlayerStore,
  ToastStore
} from '../../stores';
import {browserHistory} from 'react-router';
import {
  Button,
  Table,
  Glyphicon
} from 'react-bootstrap';

@observer
class PlayerDetailPage extends React.Component {

  @observable player = null;

  constructor(props) {
    super(props);
  }

  @action
  async componentWillMount() {
    try {
      this.player = await PlayerStore.getPlayer(this.props.routeParams.teamId, this.props.routeParams.playerId);
    }
    catch (err) {
      browserHistory.push('/home');
    }
  }

  render() {
    if (!this.player) {
      return <div className="container">...loading</div>
    }
    console.log('render', JSON.stringify(this.player));
    return (
      <div className="container">
        <h2>{this.player.name}</h2>
        <Table responsive bordered striped>
          <thead>
          <tr>
            <th colSpan="4">
              <Button onClick={() => {
                browserHistory.goBack()
              }}
              >
                Back
              </Button>
            </th>
          </tr>
          <tr>
            <th>Skill</th>
            <th>Current value</th>
            <th>Last change</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Keeper</td>
            <td>{this.player.keeper}</td>
            <td>N/A</td>
            <td>
              <Button
                bsStyle="success"
                bsSize="small"
              >
                <Glyphicon glyph="plus"/>
              </Button>
              <Button
                bsSize="small"
              >
                <Glyphicon glyph="minus"/>
              </Button>
            </td>
          </tr>
          <tr>
            <td>Defending</td>
            <td>{this.player.defending}</td>
            <td>N/A</td>
            <td>
              <Button
                bsStyle="success"
                bsSize="small"
              >
                <Glyphicon glyph="plus"/>
              </Button>
              <Button
                bsSize="small"
              >
                <Glyphicon glyph="minus"/>
              </Button>
            </td>
          </tr>
          <tr>
            <td>Playmaking</td>
            <td>{this.player.playmaking}</td>
            <td>N/A</td>
            <td>
              <Button
                bsStyle="success"
                bsSize="small"
              >
                <Glyphicon glyph="plus"/>
              </Button>
              <Button
                bsSize="small"
              >
                <Glyphicon glyph="minus"/>
              </Button>
            </td>
          </tr>
          <tr>
            <td>Winger</td>
            <td>{this.player.winger}</td>
            <td>N/A</td>
            <td>
              <Button
                bsStyle="success"
                bsSize="small"
              >
                <Glyphicon glyph="plus"/>
              </Button>
              <Button
                bsSize="small"
              >
                <Glyphicon glyph="minus"/>
              </Button>
            </td>
          </tr>
          <tr>
            <td>Passing</td>
            <td>{this.player.passing}</td>
            <td>N/A</td>
            <td>
              <Button
                bsStyle="success"
                bsSize="small"
              >
                <Glyphicon glyph="plus"/>
              </Button>
              <Button
                bsSize="small"
              >
                <Glyphicon glyph="minus"/>
              </Button>
            </td>
          </tr>
          <tr>
            <td>Scoring</td>
            <td>{this.player.scoring}</td>
            <td>N/A</td>
            <td>
              <Button
                bsStyle="success"
                bsSize="small"
              >
                <Glyphicon glyph="plus"/>
              </Button>
              <Button
                bsSize="small"
              >
                <Glyphicon glyph="minus"/>
              </Button>
            </td>
          </tr>
          <tr>
            <td>Set pieces</td>
            <td>{this.player.set_pieces}</td>
            <td>N/A</td>
            <td>
              <Button
                bsStyle="success"
                bsSize="small"
              >
                <Glyphicon glyph="plus"/>
              </Button>
              <Button
                bsSize="small"
              >
                <Glyphicon glyph="minus"/>
              </Button>
            </td>
          </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

export default PlayerDetailPage;