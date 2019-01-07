import React, { Component } from "react";
import styled from "styled-components";

const DivContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ReadmoreButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 150px;
  padding: 10px;
  background-color: ${props => (props.hasNextPage ? "#fdc02f" : "#CCC")};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

export default props => (
  <DivContainer>
    <ReadmoreButton hasNextPage={props.hasNextPage} onClick={props.onLoadMore}>
      {props.isLoading ? (
        <div class="spinner-border text-light" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        "READ MORE"
      )}
    </ReadmoreButton>
  </DivContainer>
);
