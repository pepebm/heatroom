import React, { PureComponent } from 'react';
import {
  Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip
} from 'recharts';


const initialState = {
  left: 'dataMin',
  right: 'dataMax',
  refAreaLeft: '',
  refAreaRight: '',
  top: 'dataMax+1',
  bottom: 'dataMin-1',
  top2: 'dataMax+20',
  bottom2: 'dataMin-20',
  animation: true,
};

class LineChartComp extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      ...initialState
    };
    console.log(this.state.data);
  }

  render() {
    const {
      data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2,
    } = this.state;

    return (
      <div className="highlight-bar-charts" style={{ userSelect: 'none' }}>

        <LineChart
          width={800}
          height={400}
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey="outtime"
            domain={[left, right]}
          />
          <YAxis
            allowDataOverflow
            type="number"
            yAxisId="1"
          />
          <Tooltip />
          <Line 
            yAxisId="1" 
            type="natural" 
            dataKey="avgcount" 
            stroke="#8884d8" 
            animationDuration={1000} 
          />
        </LineChart>

      </div>
    );
  }
}

export default LineChartComp;