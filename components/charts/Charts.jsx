import React from "react";
import { Query } from "react-apollo";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from "recharts";
import moment from "moment";
import styled from "styled-components";
import { GET_CHARTQUERYPARAMS } from "../../lib/client";
import { GET_RATES } from "../../pages/rates/ratesQueries";
import { theme } from "../../lib/theme";
import convertToChartQuery from "../../utils/convertToChartQuery";

const chartLineColors = [
  "#c0392b",
  "#3498db",
  "#f1c40f",
  "#9b59b6",
  "#34495e",
  "#27ae60",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#16a085",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  "#f39c12",
  "#d35400",
  "#c0392b",
  "#1abc9c",
  "#3498db",
  "#9b59b6",
  "#2ecc71",
  "#34495e",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#16a085",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  "#f39c12",
  "#d35400",
  "#c0392b",
  "#1abc9c",
  "#3498db",
  "#9b59b6",
  "#2ecc71",
  "#34495e",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#16a085",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  "#f39c12",
  "#d35400",
  "#c0392b"
];
// const liners = ['HMM', 'MSK', ... ]
//
// const result = [
//   {month: '2018-09', HMM: 4000, MSK: 2400, MCC: 2400},
//   {month: '2018-10', HMM: 3000, MSK: 1398, MCC: 2210},
//   ...
// ];

const LinerButton = props => {
  let index = props.liners.findIndex(liner => {
    return liner === props.name;
  });
  if (index > -1) {
    return (
      <DivLinerButton isSelected={true} index={index}>
        {props.name}
      </DivLinerButton>
    );
  } else {
    return <DivLinerButton isSelected={false}>{props.name}</DivLinerButton>;
  }
};

const DivMonthHeader = styled.div`
  padding: 5px;
  margin: 3px;
  border-color: ${theme.DARK};
  border-width: 1px;
  border-bottom-style: solid;
`;

const DivLinerButton = styled.div`
  color: white;
  background-color: ${props =>
    props.isSelected ? chartLineColors[props.index + 2] : theme.LIGHT};
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
  padding: ${props =>
    props.isSelected ? "6px 3px 4px 7px;" : "5px 5px 5px 5px;"}
  margin: 3px;
  ${props =>
    props.isSelected
      ? "-moz-box-shadow: inset 2px 2px 2px rgba(0, 0, 0, .4);"
      : null};
  ${props =>
    props.isSelected
      ? "-webkit-box-shadow: inset 2px 2px 2px rgba(0, 0, 0, .4);"
      : null};
  ${props =>
    props.isSelected
      ? "box-shadow: inset 2px 2px 2px rgba(0, 0, 0, .4);"
      : null};
`;

class Charts extends React.Component {
  state = { liners20: [], liners40: [], liners4H: [] };
  _canSearch = chartQueryParams => {
    if (
      chartQueryParams.selectedPl &&
      chartQueryParams.selectedPd &&
      chartQueryParams.selectedTy
    ) {
      return true;
    } else {
      return false;
    }
  };
  _handleLinerButtonClick = (val, handler) => {
    switch (handler) {
      case "20":
        this.setState(prevState => {
          let index = prevState.liners20.findIndex(liner => {
            return liner === val.liner;
          });
          let newState = {};
          if (index > -1) {
            prevState.liners20.splice(index, 1);
            newState = {
              ...prevState
            };
          } else {
            newState = {
              ...prevState,
              ...prevState.liners20.push(val.liner)
            };
          }
          return newState;
        });
        break;
      case "40":
        this.setState(prevState => {
          let index = prevState.liners40.findIndex(liner => {
            return liner === val.liner;
          });
          let newState = {};
          if (index > -1) {
            prevState.liners40.splice(index, 1);
            newState = {
              ...prevState
            };
          } else {
            newState = {
              ...prevState,
              ...prevState.liners40.push(val.liner)
            };
          }
          return newState;
        });
        break;
      case "4H":
        this.setState(prevState => {
          let index = prevState.liners4H.findIndex(liner => {
            return liner === val.liner;
          });
          let newState = {};
          if (index > -1) {
            prevState.liners4H.splice(index, 1);
            newState = {
              ...prevState
            };
          } else {
            newState = {
              ...prevState,
              ...prevState.liners4H.push(val.liner)
            };
          }
          return newState;
        });
        break;
      default:
        break;
    }
  };
  render() {
    const renderCustomizedLabel = props => {
      const { x, y, value } = props;
      return (
        <text x={x} y={y - 10} fontSize={12} textAnchor="middle">
          {value}
        </text>
      );
    };
    return (
      <Query query={GET_CHARTQUERYPARAMS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;

          const chartQueryParams = data.chartQueryParams;
          if (this._canSearch(chartQueryParams)) {
            return (
              <Query
                query={GET_RATES}
                variables={{
                  first: null,
                  queryParams: JSON.stringify(
                    convertToChartQuery(chartQueryParams)
                  ),
                  after: null
                }}
              >
                {({ loading, error, data }) => {
                  if (loading) return <div>Loading...</div>;
                  if (error) return <div>Error :(</div>;

                  const edges = data.getRates.data.edges;

                  let months = [];
                  let currentDate = moment(
                    chartQueryParams.initialSF,
                    "ddd MMM DD YYYY HH:mm:ss [GMT]"
                  );
                  let endDate = moment(
                    chartQueryParams.initialST,
                    "ddd MMM DD YYYY HH:mm:ss [GMT]"
                  );
                  while (currentDate.isBefore(endDate)) {
                    months.push(currentDate.format("YYYY-MM"));
                    currentDate.add(1, "month");
                  }

                  let result = { "20": [], "40": [], "4H": [] };
                  let resultTable = { "20": [], "40": [], "4H": [] };
                  months.map(month => {
                    let monthRates = [];
                    let averages = { "20": [], "40": [], "4H": [] };
                    edges.map(edge => {
                      if (
                        moment(edge.node.effectiveDate).isSame(month, "month")
                      ) {
                        monthRates.push(edge.node);
                      }
                      return null;
                    });

                    if (monthRates.length > 0) {
                      let liners = [
                        ...new Set(monthRates.map(node => node.liner.name))
                      ];
                      liners.map(liner => {
                        let count = { "20": 0, "40": 0, "4H": 0 };
                        let sum = { "20": 0, "40": 0, "4H": 0 };
                        monthRates.map(node => {
                          if (node.liner.name === liner) {
                            if (parseInt(node.buying20, 10) !== 0) {
                              sum["20"] += node.buying20;
                              count["20"] += 1;
                            }
                            if (parseInt(node.buying40, 10) !== 0) {
                              sum["40"] += node.buying40;
                              count["40"] += 1;
                            }
                            if (parseInt(node.buying4H) !== 0) {
                              sum["4H"] += node.buying4H;
                              count["4H"] += 1;
                            }
                          }
                          return null;
                        });

                        if (parseInt(count["20"], 10) > 0) {
                          averages["20"].push({
                            liner: liner,
                            avg: Math.ceil(sum["20"] / count["20"])
                          });
                        }
                        if (parseInt(count["40"], 10) > 0) {
                          averages["40"].push({
                            liner: liner,
                            avg: Math.ceil(sum["40"] / count["40"])
                          });
                        }
                        if (parseInt(count["4H"], 10) > 0) {
                          averages["4H"].push({
                            liner: liner,
                            avg: Math.ceil(sum["4H"] / count["4H"])
                          });
                        }
                        return null;
                      });

                      let max20 =
                        averages["20"].length > 0
                          ? Math.max(...averages["20"].map(rate => rate.avg))
                          : null;

                      let min20 =
                        averages["20"].length > 0
                          ? Math.min(...averages["20"].map(rate => rate.avg))
                          : null;

                      let max40 =
                        averages["40"].length > 0
                          ? Math.max(...averages["40"].map(rate => rate.avg))
                          : null;

                      let min40 =
                        averages["40"].length > 0
                          ? Math.min(...averages["40"].map(rate => rate.avg))
                          : null;

                      let max4H =
                        averages["4H"].length > 0
                          ? Math.max(...averages["4H"].map(rate => rate.avg))
                          : null;
                      let min4H =
                        averages["4H"].length > 0
                          ? Math.min(...averages["4H"].map(rate => rate.avg))
                          : null;

                      result["20"].push({
                        month: month,
                        "20' MAX": max20,
                        "20' MIN": min20
                      });
                      result["20"].map(res => {
                        if (res.month === month) {
                          averages["20"].map(
                            item => (res[item.liner] = item.avg)
                          );
                        }
                        return null;
                      });

                      result["40"].push({
                        month: month,
                        "40' MAX": max40,
                        "40' MIN": min40
                      });
                      result["40"].map(res => {
                        if (res.month === month) {
                          averages["40"].map(
                            item => (res[item.liner] = item.avg)
                          );
                        }
                        return null;
                      });

                      result["4H"].push({
                        month: month,
                        "40'HC MAX": max4H,
                        "40'HC MIN": min4H
                      });
                      result["4H"].map(res => {
                        if (res.month === month) {
                          averages["4H"].map(
                            item => (res[item.liner] = item.avg)
                          );
                        }
                        return null;
                      });

                      resultTable["20"].push({
                        month: month,
                        value: averages["20"]
                      });
                      resultTable["40"].push({
                        month: month,
                        value: averages["40"]
                      });
                      resultTable["4H"].push({
                        month: month,
                        value: averages["4H"]
                      });
                    } else {
                      // 해당월 입력된 운임이 없는 경우 (monthRates === null)
                      result["20"].push({
                        month: month,
                        "20' MAX": null,
                        "20' MIN": null
                      });

                      result["40"].push({
                        month: month,
                        "40' MAX": null,
                        "40' MIN": null
                      });

                      result["4H"].push({
                        month: month,
                        "40'HC MAX": null,
                        "40'HC MIN": null
                      });

                      resultTable["20"].push({
                        month: month,
                        value: []
                      });
                      resultTable["40"].push({
                        month: month,
                        value: []
                      });
                      resultTable["4H"].push({
                        month: month,
                        value: []
                      });
                    }
                    return null;
                  });

                  return (
                    <div className="container-fluid">
                      <div
                        className="mt-5 mb-2 py-2"
                        style={{ backgroundColor: "white" }}
                      >
                        <ResponsiveContainer width="100%" height={400}>
                          <LineChart
                            data={result["20"]}
                            margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
                          >
                            <XAxis
                              dataKey="month"
                              padding={{ left: 30, right: 30 }}
                            />
                            <YAxis />
                            <CartesianGrid strokeDasharray="1 1" />
                            <Tooltip
                              itemSorter={(item1, item2) =>
                                item2.value - item1.value
                              }
                            />
                            <Legend verticalAlign="top" height={36} />

                            <Line
                              type="monotone"
                              dataKey="20' MAX"
                              stroke={chartLineColors[0]}
                            >
                              <LabelList
                                dataKey="20' MAX"
                                content={renderCustomizedLabel}
                              />
                            </Line>

                            <Line
                              type="monotone"
                              dataKey="20' MIN"
                              stroke={chartLineColors[1]}
                            >
                              <LabelList
                                dataKey="20' MIN"
                                content={renderCustomizedLabel}
                              />
                            </Line>
                            {this.state.liners20.map((liner, k) => (
                              <Line
                                key={k}
                                type="monotone"
                                dataKey={liner}
                                stroke={chartLineColors[k + 2]}
                                activeDot={{ r: 8 }}
                              >
                                <LabelList
                                  dataKey={liner}
                                  content={renderCustomizedLabel}
                                />
                              </Line>
                            ))}
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="row">
                        {resultTable["20"].map((result, k) => (
                          <div key={k} className="col text-center">
                            <DivMonthHeader>{result.month}</DivMonthHeader>
                            {result.value
                              .sort((a, b) => {
                                return b.avg - a.avg;
                              })
                              .map((val, k) => (
                                <div
                                  key={k}
                                  className="row"
                                  onClick={() =>
                                    this._handleLinerButtonClick(val, "20")
                                  }
                                >
                                  <div className="col">
                                    <LinerButton
                                      name={val.liner}
                                      liners={this.state.liners20}
                                    />
                                  </div>
                                  <div className="col">{val.avg}</div>
                                </div>
                              ))}
                          </div>
                        ))}
                      </div>

                      {/* 40' Charts */}
                      <div
                        className="mt-5 mb-2 py-2"
                        style={{ backgroundColor: "white" }}
                      >
                        <ResponsiveContainer width="100%" height={400}>
                          <LineChart
                            data={result["40"]}
                            margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
                          >
                            <XAxis
                              dataKey="month"
                              padding={{ left: 30, right: 30 }}
                            />
                            <YAxis />
                            <CartesianGrid strokeDasharray="1 1" />
                            <Tooltip
                              itemSorter={(item1, item2) =>
                                item2.value - item1.value
                              }
                            />
                            <Legend verticalAlign="top" height={36} />

                            <Line
                              type="monotone"
                              dataKey="40' MAX"
                              stroke={chartLineColors[0]}
                            >
                              <LabelList
                                dataKey="40' MAX"
                                content={renderCustomizedLabel}
                              />
                            </Line>

                            <Line
                              type="monotone"
                              dataKey="40' MIN"
                              stroke={chartLineColors[1]}
                            >
                              <LabelList
                                dataKey="40' MIN"
                                content={renderCustomizedLabel}
                              />
                            </Line>
                            {this.state.liners40.map((liner, k) => (
                              <Line
                                key={k}
                                type="monotone"
                                dataKey={liner}
                                stroke={chartLineColors[k + 2]}
                                activeDot={{ r: 8 }}
                              >
                                <LabelList
                                  dataKey={liner}
                                  content={renderCustomizedLabel}
                                />
                              </Line>
                            ))}
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="row">
                        {resultTable["40"].map((result, k) => (
                          <div key={k} className="col text-center">
                            <DivMonthHeader>{result.month}</DivMonthHeader>
                            {result.value
                              .sort((a, b) => {
                                return b.avg - a.avg;
                              })
                              .map((val, k) => (
                                <div
                                  key={k}
                                  className="row"
                                  onClick={() =>
                                    this._handleLinerButtonClick(val, "40")
                                  }
                                >
                                  <div className="col">
                                    <LinerButton
                                      name={val.liner}
                                      liners={this.state.liners40}
                                    />
                                  </div>
                                  <div className="col">{val.avg}</div>
                                </div>
                              ))}
                          </div>
                        ))}
                      </div>

                      {/* 4H Charts */}
                      <div
                        className="mt-5 mb-2 py-2"
                        style={{ backgroundColor: "white" }}
                      >
                        <ResponsiveContainer width="100%" height={400}>
                          <LineChart
                            data={result["4H"]}
                            margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
                          >
                            <XAxis
                              dataKey="month"
                              padding={{ left: 30, right: 30 }}
                            />
                            <YAxis />
                            <CartesianGrid strokeDasharray="1 1" />
                            <Tooltip
                              itemSorter={(item1, item2) =>
                                item2.value - item1.value
                              }
                            />
                            <Legend verticalAlign="top" height={36} />

                            <Line
                              type="monotone"
                              dataKey="40'HC MAX"
                              stroke={chartLineColors[0]}
                            >
                              <LabelList
                                dataKey="40'HC MAX"
                                content={renderCustomizedLabel}
                              />
                            </Line>

                            <Line
                              type="monotone"
                              dataKey="40'HC MIN"
                              stroke={chartLineColors[1]}
                            >
                              <LabelList
                                dataKey="40'HC MIN"
                                content={renderCustomizedLabel}
                              />
                            </Line>
                            {this.state.liners4H.map((liner, k) => (
                              <Line
                                key={k}
                                type="monotone"
                                dataKey={liner}
                                stroke={chartLineColors[k + 2]}
                                activeDot={{ r: 8 }}
                              >
                                <LabelList
                                  dataKey={liner}
                                  content={renderCustomizedLabel}
                                />
                              </Line>
                            ))}
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="row">
                        {resultTable["4H"].map((result, k) => (
                          <div key={k} className="col text-center">
                            <DivMonthHeader>{result.month}</DivMonthHeader>
                            {result.value
                              .sort((a, b) => {
                                return b.avg - a.avg;
                              })
                              .map((val, k) => (
                                <div
                                  key={k}
                                  className="row"
                                  onClick={() =>
                                    this._handleLinerButtonClick(val, "4H")
                                  }
                                >
                                  <div className="col">
                                    <LinerButton
                                      name={val.liner}
                                      liners={this.state.liners4H}
                                    />
                                  </div>
                                  <div className="col">{val.avg}</div>
                                </div>
                              ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }}
              </Query>
            );
          } else {
            return null;
          }
        }}
      </Query>
    );
  }
}

export default Charts;
