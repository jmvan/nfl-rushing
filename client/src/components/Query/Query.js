import React from 'react';
import styled from 'styled-components';

import QueryButtons from './QueryButtons.js';
import QuerySelector from './QuerySelector.js';
import QueryText from './QueryText.js';


const QueryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 16px;
  padding-bottom: 16px;
`

const Query = () => {
  return (
    <QueryWrapper>
      <QueryText />
      <QuerySelector />
      <QueryButtons />
    </QueryWrapper>
  );
}

export default Query