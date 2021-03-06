var React = require('react');

var InsightDatasetSection = require('./InsightDatasetSection');
var InsightSeasonalQuery = require('./seasonal/InsightSeasonalQuery');
var InsightTab = require('./InsightTab');
var InsightFind = require('./similarity/InsightFind');
var InsightViewTable = require('./similarity/InsightViewTable');

var InsightConstants = require('./../flux/constants/InsightConstants');


/**
 * The control panel containing all the options and queries etc
 */
var InsightControlPanel = React.createClass({

  render: function() {
    var style = {
      divStyle : {width: this.props.width},
      cheatingStyle : {
       height: 100
      }
    }

    var modeList = [InsightConstants.VIEW_MODE_SIMILARITY,
                   InsightConstants.VIEW_MODE_SEASONAL];
    var that = this;
    var tabList = modeList.map(function(mode) {
      return <InsightTab type={mode} current={that.props.viewMode} key={mode} />;
    });

    var tabsJSX =
    <div className="controlPanelTabPane"
         style={style.divStyle} >
      {tabList}
    </div>;

    //show regardless
    var datasetJSX =
    <InsightDatasetSection dsCollectionList={this.props.dsCollectionList}
                           dsCollectionIndex={this.props.dsCollectionIndex}
                           thresholdRange={this.props.thresholdRange}
                           thresholdCurrent={this.props.thresholdCurrent}
                           thresholdStep={this.props.thresholdStep}
                           datasetIconMode={this.props.datasetIconMode}/>;

    var queryControlJSX = null;
    switch (this.props.viewMode) {
      case InsightConstants.VIEW_MODE_SIMILARITY:
        queryControlJSX = this._getSimilarityQueryControls();
        break;
      case InsightConstants.VIEW_MODE_SEASONAL:
        queryControlJSX = this._getSeasonalQueryControls();
        break;
      case InsightConstants.VIEW_MODE_CLUSTER:
        queryControlJSX = this._getClusterQueryControls();
        break;
    }

    //TODO(charlie): add history once the history data is figured out
    var viewTableJSX = null;
    // (this.props.results.resultList.length > 0) && (
    //      <div className="viewTable">
    //          <div className='section'>
    //            <h2> History </h2>
    //          </div>
    //         <InsightViewTable width={this.props.width}
    //                     results={this.props.results.resultList}
    //                     height={170}/>
    //     </div>);

    var panelJSX =
    <div className="controlPanel" style={style.divStyle}>
      {tabsJSX}
      {datasetJSX}
      {queryControlJSX}
      {viewTableJSX}
    </div>;//

    return panelJSX;
  },

  _getSimilarityQueryControls: function() {
    return null;
  },

  _getSeasonalQueryControls: function() {
    var queryJSX = <InsightSeasonalQuery dsCurrentLength={this.props.dsCurrentLength}
                                         {...this.props.seasonal} />;
    return <div>
      {queryJSX}
    </div>;
  },

  _getClusterQueryControls: function() {
    return null;
  }
});

module.exports = InsightControlPanel;
