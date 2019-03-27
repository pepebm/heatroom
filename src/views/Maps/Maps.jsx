import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import * as h337 from "heatmap.js";

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
    const heatmap = h337.create(config);
    this.generate(heatmap);
  }

  generate(heatmap) {
    var width = this.heatmapRef.current.offsetWidth;
    var height = this.heatmapRef.current.offsetHeight;
    
    var numSamples = 500;
    // randomly generate extremas
    var extremas = [Math.random() * numSamples, Math.random() * numSamples];
    var max = Math.max.apply(Math, extremas);
    var min = Math.min.apply(Math, extremas);
    var data = [];

    for (var i = 0; i < numSamples; i++) {
      data.push({ 
        x: Math.random() * width, 
        y: Math.random() * height, 
        value: (Math.random() * max - min) + min, 
        // btw, we can set a radius on a point basis
        radius: Math.random() * 80 
      });
    }
    // set the generated dataset
    heatmap.setData({
      min: min,
      max: max,
      data: data
    });
  }

  render(){
    const { classes } = this.props;

    return (
      <div className={classes.heatmapWrapper}>
        <div 
          className={classes.heatmapContainer} 
          ref={this.heatmapRef}>
        </div>
      </div>
    );
  }
  
}

Maps.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(mapsStyle)(Maps);
