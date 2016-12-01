var React = require('react');
var InsightConstants = require('./../../flux/constants/InsightConstants');
var InsightSimilarityResultView = require('./InsightSimilarityResultView');
var InsightSimilarityPreview = require('./InsightSimilarityPreview');

var InsightSimilarityViewRight = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    resultViewData: React.PropTypes.object,
    previewData: React.PropTypes.object,
  },

  render: function() {
    var dimensions = {
      width: this.props.width,
      height: this.props.height / 2
    }
    return (<div style={{height: this.props.height, width: this.props.width}}>
        <InsightSimilarityResultView {...this.props.resultViewData} {...dimensions}/>
        <InsightSimilarityPreview {...this.props.previewData} {...dimensions}/>
    </div>);
  }
});

module.exports = InsightSimilarityViewRight;