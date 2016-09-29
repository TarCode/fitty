import React from 'react';
import { Link } from 'react-router';
import store from '../../stores/store';
import viewActions from '../../actions/viewActions';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

export default class Dashboard extends React.Component {
  constructor( props ) {
    super( props );
    this.state = store.getStoreData();
    this.addGoalSession = this.addGoalSession.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    $('select').material_select();
    store.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    store.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(store.getStoreData());
  }

  addGoalSession() {
    var goalValue = document.getElementById('goalValue');
    var goal = document.getElementById('goal');
    viewActions.postGoalSession({goal: goal.value, goalValue: goalValue.value})
    goalValue.value = null;
  }

  render() {
    var biPolarLineChartOptions = {
      showArea: true,
      showLine: true,
      showPoint: true,
      axisX: {
        showLabel: true,
        showGrid: true
      }
    }


    return(
      <div>
        <div className='row'>
            <div className='col s3'>
                <img className='responsive-img' src={ this.state.user.userImg }/>
            </div>
            <div className='col s6'>
                <h4>Progress Check In:</h4>
                <div className='input-field'>
                  
                </div>
                <input id='goalValue' type='number' className='input' placholder='time/weight'/>
                <button onClick={ this.addGoalSession } className='btn btn-small black'>Add Progress</button>
            </div>
            <div className='col s3'>
            <br/>
              <button className='btn btn-small black'>Add Goal</button>
            </div>
        </div>
        <hr/>
        <XYPlot
          width={300}
          height={300}>
          <HorizontalGridLines />
          <LineSeries
            data={[
              {x: 1, y: 10},
              {x: 2, y: 5},
              {x: 3, y: 15}
            ]}/>
          <XAxis />
          <YAxis />
        </XYPlot>
      </div>
    )
  }
}
