import React from "react";
import {
  Chart,
  Legend,
  CommonSeriesSettings,
  SeriesTemplate,
  Tooltip,
  Crosshair,
  ArgumentAxis,
  Label,
} from "devextreme-react/chart";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function LineGraph(props) {
  const customizeTooltip = (arg) => {
    return {
      text: `${arg.valueText}`,
      color: "#2a2a2a",
      fontColor: "#FFF",
      borderColor: "#3d3f3f",
    };
  };
  const legendClickHandler = (e) => {
    e.target.isVisible() ? e.target.hide() : e.target.show();
  };
  return (
    <>
      <Container id="chart">
        <Chart
          id="MeasuresOverDimention"
          dataSource={props.dataSource}
          onLegendClick={legendClickHandler}
        >
          <CommonSeriesSettings
            argumentField="dimensionValue"
            valueField="value"
            type="line"
            ignoreEmptyPoints={true}
            barPadding="0.00004"
            barWidth="40"
          />
          <SeriesTemplate nameField="type" />
          <ArgumentAxis>
            <Label
              overlappingBehavior="rotate"
              HorizontalAlignment="center"
              rotationAngle={-90}
            />
          </ArgumentAxis>
          <Crosshair enabled={true} color="Gray" dashStyle="dash" />
          <Legend
            verticalAlignment="Top"
            horizontalAlignment="left"
            itemsAlignment="left"
            itemTextPosition="right"
            orientation="horizontal"
            columnCount={10}
            columnItemSpacing={10}
            rowCount={1}
            rowItemSpacing={5}
            position="outside"
          ></Legend>
          <Tooltip
            enabled={true}
            cornerRadius={50}
            location="edge"
            customizeTooltip={customizeTooltip}
          />
        </Chart>
        <h2>{props.dimension ? props.dimension.name : ""}</h2>
      </Container>
    </>
  );
}
