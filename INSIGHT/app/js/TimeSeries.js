var d3 = require('d3');

class TimeSeries {

  constructor(values, name, loc, seq, start, end) {
    this._values = values;
    this._loc = loc; // = 0: from dataset, = 1: from query file
    this._seq = seq;
    this._start = start;
    this._end = end;
    this._name = name;
  }

  getLocation() {
    return this._loc;
  }

  _getScale(s) {
    var scale = (x) => x;
    if (s) scale = d3.scaleLinear().domain(s.domain).range(s.range);
    return scale;
  }

  _getDenormalizer(d) {
    var denormalizer = (x) => x;
    if (d) {
      var diff = d.max - d.min;
      denormalizer = (x) => x * diff + d.min;
    }
    return denormalizer;
  }

  getValues(scaleX, denormalizeY) {
    var scale = this._getScale(scaleX);
    var denormalizer = this._getDenormalizer(denormalizeY);
    return this._values.map((x) => [scale(x[0]), denormalizer(x[1])]);
  }

  getLength() {
    if (this._values) return this._values.length; else return 0;
  }

  getSeq() {
    return this._seq;
  }

  getStart(scaleX) {
    var scale = this._getScale(scaleX);
    return scale(this._start);
  }

  getEnd(scaleX) {
    var scale = this._getScale(scaleX);
    return scale(this._end);
  }

  getName() {
    return this._name;
  }

  getMax(denormalizeY) {
    var denormalizer = this._getDenormalizer(denormalizeY);
    return Math.max(...this._values.map((x) => denormalizer(x[1])));
  }

  getMin(denormalizeY) {
    var denormalizer = this._getDenormalizer(denormalizeY);
    return Math.min(...this._values.map((x) => denormalizer(x[1])));
  }

  denormalize(oriMax, oriMin) {
    var diff = oriMax - oriMin;
    this._values = this._values.map((x) => [x[0], (x[1] * diff + oriMin).toPrecision(4)]);
  }

  /*
   * tests for value equality, EXCLUDING the actual values and the name
   */
  equivalent(other) {
    return this._start === other.getStart() &&
           this._end === other.getEnd() &&
           //this._loc === other.getLocation() &&
           this._seq === other.getSeq();
  }

  slice(start, end) {
    var newStart = this._start + start;
    var newEnd = Math.min(this._start + end - 1, this._end);
    return new TimeSeries(this._values.slice(start, end),
                          this._name,
                          this._loc,
                          this._seq,
                          newStart,
                          newEnd);
  }
};

module.exports = TimeSeries;
