import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.title === "Columns" ? "column" : "row")};
  background-color: ${(props) =>
    props.title === "Columns" ? "none" : " #c4c2c2"};
  border: ${(props) =>
    props.title === "Columns" ? "none" : "1px solid black"};
  height: ${(props) => (props.title === "Columns" ? "none" : "40px")};
`;
const ListDiv = styled.div`
  padding-left: 0;
  width: 100%;
  display: ${(props) => (props.title === "Columns" ? "contents" : "flex")};
`;
const DraggableItem = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  background-color: antiquewhite;
  height: 25px;
`;

export default function DraggableItems(props) {
  return (
    <>
      <Container title={props.title}>
        <ListDiv title={props.title} id={props.title + "List"}>
          {props.data.map((item, id) => {
            return (
              <Draggable key={item.name} draggableId={item.name} index={id}>
                {(provided) => {
                  return (
                    <DraggableItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span>{item.name}</span>
                    </DraggableItem>
                  );
                }}
              </Draggable>
            );
          })}
        </ListDiv>
      </Container>
    </>
  );
}
