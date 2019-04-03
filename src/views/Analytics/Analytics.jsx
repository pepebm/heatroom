import React from "react";
import axios from "axios";
import moment from "moment";
import LoadingScreen from "react-loading-screen";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import LineChartComp from "../../components/LineChart/LineChart";

import logo from "../../assets/img/reactlogo.png";

const byPropKey = (propertyName, value) => () => ({ [propertyName]: value });
const style = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};
class Analytics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timeseriesData: [],
      isLoading: true,
      error: null
    };
  }

  componentDidMount(){
    axios.get('https://heatroom-api.azurewebsites.net/api/timeseries')
      .then(res => {
        res.data.data.map(d => {
          d.outtime = moment(d.outtime).format("MMM DD / HH:mm");
          return d;
        });
        this.setState(byPropKey('timeseriesData', res.data.data));
        this.setState(byPropKey('isLoading', false));
      }).catch(err => {
        this.setState(byPropKey('error', err));
        console.log(err);
      });
  }

  render(){
    const { classes } = this.props;

    return (
      <LoadingScreen
        loading={this.state.isLoading}
        bgColor='#f1f1f1'
        spinnerColor='#9ee5f8'
        textColor='#676767'
        logoSrc={logo}
        text="Loading data from the cloud"
      >
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Clients tracked time series
            </h4>
              </CardHeader>
              <CardBody>
                {
                  this.state.timeseriesData.length > 0 ?
                    <LineChartComp data={this.state.timeseriesData} /> : null
                }
              </CardBody>
            </Card>
          </GridItem>

        </GridContainer>
      </LoadingScreen>
    );
  }
}

export default withStyles(style)(Analytics);
