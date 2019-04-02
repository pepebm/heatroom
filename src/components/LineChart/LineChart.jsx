import React, { PureComponent } from 'react';
import {
  Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea,
} from 'recharts';

const data = [
  { id: 1, numUsr: 4, impression: 100 },
  { id: 2, numUsr: 2, impression: 120 },
  { id: 3, numUsr: 1, impression: 150 },
  { id: 4, numUsr: 1, impression: 180 },
  { id: 5, numUsr: 2, impression: 200 },
  { id: 6, numUsr: 3, impression: 499 },
  { id: 7, numUsr: 1, impression: 50 },
  { id: 8, numUsr: 5, impression: 100 },
  { id: 9, numUsr: 9, impression: 200 },
  { id: 10, numUsr: 7, impression: 222 },
  { id: 11, numUsr: 4, impression: 210 },
  { id: 12, numUsr: 4, impression: 300 },
  { id: 13, numUsr: 2, impression: 50 },
  { id: 14, numUsr: 8, impression: 190 },
  { id: 15, numUsr: 0, impression: 300 },
  { id: 16, numUsr: 9, impression: 400 },
  { id: 17, numUsr: 3, impression: 200 },
  { id: 18, numUsr: 2, impression: 50 },
  { id: 19, numUsr: 3, impression: 100 },
  { id: 20, numUsr: 7, impression: 100 },
];

const getAxisYDomain = (from, to, ref, offset) => {
  const refData = data.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];
  refData.forEach((d) => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

const initialState = {
  data,
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

export default class LineChartComp extends PureComponent {

  constructor(props) {
    super(props);
    this.state = initialState;
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
          onMouseDown={e => this.setState({ refAreaLeft: e.activeLabel })}
          onMouseMove={e => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey="id"
            domain={[left, right]}
            type="number"
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
          />
          <YAxis
            orientation="right"
            allowDataOverflow
            domain={[bottom2, top2]}
            type="number"
            yAxisId="2"
          />
          <Tooltip />
          <Line yAxisId="1" type="natural" dataKey="numUsr" stroke="#8884d8" animationDuration={300} />
          <Line yAxisId="2" type="natural" dataKey="impression" stroke="#82ca9d" animationDuration={300} />

          {
            (refAreaLeft && refAreaRight) ? (
              <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />) : null
          }
        </LineChart>

      </div>
    );
  }
}
