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
  const [dataValues, setDataValues] = useState([]);
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
          setDataValues(customizedData);
        } else {
          alert("An error happened while getting data values");
        }
      })
      .catch((error) => {
        alert("An error happened while getting data values");
      });
  };
  const clearField = (title) => {
    if (title === "Dimension") {
      lists.Columns = [...lists.Columns, ...lists.Dimension];
      lists.Dimension = [];
      setLists({ ...lists });
    } else {
      lists.Columns = [...lists.Columns, ...lists.Measure];
      lists.Measure = [];
      setLists({ ...lists });
    }
  };
  const onHandleDragEnd = (result, lists, setLists) => {
    const { source, destination } = result;
    if (
      !result.destination ||
      (lists.Dimension.length > 0 && destination.droppableId === "Dimension")
    )
      return;

    if (
      source.droppableId !== destination.droppableId &&
      (destination.droppableId.toLowerCase() ===
        lists[source.droppableId][source.index].function ||
        destination.droppableId === "Columns")
    ) {
      const sourceItems = lists[source.droppableId];
      const destItems = lists[destination.droppableId];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setLists({
        ...lists,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems,
      });
    } else {
      const copiedItems = lists[source.droppableId];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setLists({
        ...lists,
        [source.droppableId]: copiedItems,
      });
    }
  };
  useEffect(() => {
    getAvailableColumns();
    return () => setLists({ Columns: [], Dimension: [], Measure: [] });
  }, []);
  useEffect(() => {
    if (lists.Dimension.length > 0 && lists.Measure.length > 0) {
      getColumnsDataValues(lists.Dimension, lists.Measure);
    }
    return () => setDataValues([]);
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
        <LineGraph dataSource={dataValues} dimension={lists.Dimension[0]} />
      </div>
    </Container>
  );
}
