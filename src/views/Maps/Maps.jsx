import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import mapsStyle from "assets/jss/material-dashboard-react/views/mapsStyle.jsx";

class Maps extends React.Component {

  constructor(props) {
    super(props);
    this.heatmapRef = React.createRef();
  }

  componentDidMount(){
    const config = {
      container: this.heatmapRef.current,
    };
    // const heatmap = h337.create(config);
    // this.generate(heatmap);
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
              </h4>
            </CardHeader>
            <CardBody>
              <div className={classes.heatmapWrapper}>
                <iframe
                  className={classes.heatmapContainer}
                  src="/heatmap/heatmap.html?_id=543&name=Apple">
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
