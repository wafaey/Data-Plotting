import React, { useState, useEffect } from "react";
import DataBox from "../../components/DataBox/DataBox";
import LineGraph from "../../components/LineGraph/LineGraph";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import API from "../../apis/index";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const Grid = styled.div`
  width: ${(props) => props.width};
`;
const DragDropContainer = styled.div`
  width: 100%;
  display: flex;
`;
export default function Plotter() {
  const [lists, setLists] = useState({
    Columns: [],
    Dimension: [],
    Measure: [],
  });
  const [dataValue, setDataValue] = useState([]);
  const getAvailableColumns = () => {
    API.getAvailableColumns()
      .then((response) => {
        if (response.data) {
          lists.Columns = response.data;
          setLists({ ...lists });
        } else {
          alert("An error happened while getting columns");
        }
      })
      .catch((error) => {
        alert("An error happened while getting columns");
      });
  };
  const getColumnsDataValues = (dimension, measures) => {
    let obj = {
      measures: measures.map((measure) => measure.name),
      dimension: dimension[0].name,
    };
    API.getColumnsDataValues(obj)
      .then((response) => {
        if (response.data) {
          let customizedData = [];
          response.data.forEach((column, id) => {
            if (id > 0) {
              column.values.forEach((value, id) => {
                customizedData.push({
                  dimensionValue: response.data[0].values[id],
                  type: column.name,
                  value: value,
                });
              });
            }
          });
          setDataValue(customizedData);
        } else {
          alert("An error happened while getting data values");
        }
      })
      .catch((error) => {
        alert("An error happened while getting data values");
      });
  };
  const clearField = () => {
  
  };
  const onHandleDragEnd = () => {
  
  };
  useEffect(() => {
    getAvailableColumns();
    return () => setLists({ Columns: [], Dimension: [], Measure: [] });
  }, []);
  useEffect(() => {
    if (lists.Dimension.length > 0 && lists.Measure.length > 0) {
      getColumnsDataValues(lists.Dimension, lists.Measure);
    }
    return () => setDataValue([]);
  }, [lists]);
  return (
    <Container>
      <DragDropContainer>
        <DragDropContext
          onDragEnd={(result) => onHandleDragEnd(result, lists, setLists)}
        >
          <Grid width={"30%"}>
            <DataBox title={"Columns"} data={lists.Columns} />
          </Grid>
          <Grid width={"45%"}>
            <DataBox
              title={"Dimension"}
              data={lists.Dimension}
              clearField={clearField}
            />
            <DataBox
              title={"Measure"}
              data={lists.Measure}
              clearField={clearField}
            />
          </Grid>
        </DragDropContext>
      </DragDropContainer>
      <div>
        <LineGraph dataSource={dataValue}  />
      </div>
    </Container>
  );
}
