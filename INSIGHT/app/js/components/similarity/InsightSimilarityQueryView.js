var React = require('react');
var InsightConstants = require('./../../flux/constants/InsightConstants');
var InsightActions = require('./../../flux/actions/InsightActions');

var MultiTimeSeriesChart = require('./../charts/MultiTimeSeriesChart');
var InsightSimilarityQuery = require('./InsightSimilarityQuery');

var {Table, Column, ColumnGroup, Cell} = require('fixed-data-table');


//TODO(charlie): color the selected one!
var DatasetNameCell = function({rowIndex, data, ...props}) {
  return <Cell {...props} >
          {rowIndex}
         </Cell>;
}

//TODO(charlie): color the selected one!
var NameCell = function({rowIndex, data, queryIndex, ...props}) {
  var style = {};
  if (queryIndex == rowIndex) {
    style = {
      backgroundColor: '#2daf89'
    }
  }
  return <Cell {...props} style={style} >
          {data[rowIndex]}
         </Cell>;
}

var MultiTimeSeriesChartCell = function({rowIndex, data, queryIndex, ...props}) {
  // var query = data[rowIndex].qValues;
  // var start = data[rowIndex].qStart;
  // var end = data[rowIndex].qEnd;
  // var querySelection = query.slice(start, end + 1);
  // var result = data[rowIndex].rValues;
  // var warpingPath = data[rowIndex].warpingPath;
  // var chartData = {
  //   series: [{values: querySelection}, {values: result}],
  //   warpingPath: warpingPath,
  //   maxDomainY: 0.2
  // };
  var chartData = {
    series: [{values: []}],
    domains: { x: [0, 100], y: [0, 1]},
  };
  var margins = {top: 0, bottom: 0, left: 0, right: 0};
  var chart = <MultiTimeSeriesChart width={props.width - 16}
                                         height={props.height - 16}
                                         margins={margins}
                                         strokeWidth={1}
                                         data={chartData}
                                         color={'blue'} />
   var style = {};
   if (queryIndex == rowIndex) {
     style = {
       backgroundColor: '#2daf89'
     }
   }
  return <Cell {...props} style={style}>
          {chart}
         </Cell>;
}

var InsightSimilarityQueryView = React.createClass({
  render: function() {

    var queryListViewData = {
      queryLocation: InsightConstants.QUERY_LOCATION_DATASET,
      // A list of names of the time series
      queryListDataset: [],
      queryListUpload: [],
      querySelectedIndexDataset: -1,
      querySelectedIndexUpload: -1,
    };

    var [queryList, queryIndex] = (this.props.queryLocation == InsightConstants.QUERY_LOCATION_DATASET)
                     ? [this.props.queryListDataset, this.props.querySelectedIndexDataset]
                     : [this.props.queryListUpload, this.props.querySelectedIndexUpload];

    var width = this.props.width / 2 ;

    var Queries =
      <ColumnGroup
        header={<Cell>Queries</Cell>}>
        <Column
          header={<Cell>Index</Cell>}
          cell={<NameCell data={queryList} queryIndex={queryIndex} />}
          width={width}
        />
        <Column
          header={<Cell>Time Series Query</Cell>}
          cell={<MultiTimeSeriesChartCell data={queryList} queryIndex={queryIndex} />}
          width={width}
          queryIndex={queryIndex}
        />
      </ColumnGroup>


    var callbackSelectQuery = this._selectQuery;

    var tableJSX =
      <div className="viewTable">
        <Table
          rowHeight={50}
          rowsCount={queryList.length}
          width={this.props.width}
          height={this.props.height - 45}
          groupHeaderHeight={40}
          headerHeight={40}
          onRowClick={this._selectQuery}>
          {Queries}
        </Table>
      </div>;
    //TODO(charlie):

    return <div>
            <InsightSimilarityQuery queryLocation={this.props.queryLocation}/>
            {tableJSX}
           </div>;
  },
  _selectQuery: function(e, rowIndex) {
    InsightActions.selectSimilarityQuery(rowIndex);
  }
});

module.exports = InsightSimilarityQueryView;
