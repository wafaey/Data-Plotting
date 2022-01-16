import React, { useState } from "react";
import DataBox from "../../components/DataBox/DataBox";
import LineGraph from "../../components/LineGraph/LineGraph";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
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
   
  };
  const getColumnsDataValues = () => {
 
  };
  const clearField = () => {
  
  };
  const onHandleDragEnd = () => {
  
  };
 
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
