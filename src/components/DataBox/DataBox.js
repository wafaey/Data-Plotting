import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DraggableItems from "./components/DraggableItems/DraggableItems";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.title === "Columns" ? "column" : "row")};
  align-items: center;
  justify-content: space-around;
  margin: 2%;
`;
const TitleHeader = styled.h2`
  width: 20%;
`;
const DroppableDiv = styled.div`
  width: 100%;
`;
const ButtonDiv = styled.div`
  width: 10%;
  display: ${(props) => (props.title === "Columns" ? "none" : "block")};
`;

const Button = styled.button`
  background-color: cornflowerblue;
  height: 42px;
  cursor: pointer;
`;
export default function DataBox(props) {
  return (
    <>
      <Container title={props.title}>
        <TitleHeader>{props.title}</TitleHeader>
        <Droppable droppableId={props.title} key={props.title}>
          {(provided) => {
            return (
              <DroppableDiv
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <DraggableItems
                  title={props.title}
                  data={props.data}
                  onHandleDragEnd={props.onHandleDragEnd}
                />
              </DroppableDiv>
            );
          }}
        </Droppable>
        <ButtonDiv title={props.title}>
          <Button
            onClick={() => {
              props.clearField(props.title);
            }}
          >
            Clear
          </Button>
        </ButtonDiv>
      </Container>
    </>
  );
}
