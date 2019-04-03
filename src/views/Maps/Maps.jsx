import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import axios from "axios";
import moment from "moment";

const byPropKey = (propertyName, value) => () => ({ [propertyName]: value });
const mapsStyle = {
  heatmapWrapper: {
    width: "100% !important",
    height: "100% !important"
  },
  heatmapContainer: {
    width: "100% !important",
    height: "80vh !important",
    zIndex: 50
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  moveRight: {
    float: 'right'
  }
};

class Maps extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      error: null
    };
  }

  componentDidMount() {
    axios.get('https://heatroom-api.azurewebsites.net/api/heatmap')
      .then(res => {
        res.data.data[0].outtime = moment(res.data.data.outtime)
                                    .format("MMM DD YY / HH:mm");
        this.setState(byPropKey('data', res.data.data[0]));
        this.setState(byPropKey('isLoading', false));
      })
      .catch(err => {
        this.setState(byPropKey('error', err))
        console.log(err);
      });
  }

  render(){
    const { classes } = this.props;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                User movement
                <span className={classes.moveRight}>
                  Retrieved from: {this.state.data.outtime}
                </span>
              </h4>
            </CardHeader>
            <CardBody>
              <div className={classes.heatmapWrapper}>
                <iframe
                  className={classes.heatmapContainer}
                  name="heatmap"
                  src={`/heatmap/heatmap.html?data=${this.state.data.hits}`}>
                </iframe>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
  
}

Maps.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(mapsStyle)(Maps);
