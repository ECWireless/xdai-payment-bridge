import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';
import { GU } from 'components/theme';

export const Container = styled.div`
  position: relative;
  width: ${GU * 80}px;
  margin: auto;
  ${media.xs`
    width: ${GU * 120}px;
  `}
  ${media.sm`
    width: ${GU * 192}px;
  `}
  ${media.md`
    width: ${GU * 248}px;
  `}
  ${media.lg`
    width: ${GU * 310}px;
  `}
  ${media.xl`
    width: ${GU * 450}px;
  `}
`;

interface IFlex {
  align?: 'flex-start' | 'center' | 'flex-end';
  direction?: 'row' | 'column';
  full?: boolean;
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-around' | 'space-between';
  wrap?: 'true';
}

export const Flex = styled.div<IFlex>`
  display: flex;
  ${(props) =>
    props.align &&
    css`
      align-items: ${props.align};
    `}
  ${(props) =>
    props.direction &&
    css`
      flex-direction: ${props.direction};
    `}
  ${(props) =>
    props.full === true &&
    css`
      height: 100%;
      width: 100%;
    `}
  ${(props) =>
    props.justify &&
    css`
      justify-content: ${props.justify};
    `}
  ${(props) =>
    props.wrap === 'true' &&
    css`
      flex-wrap: wrap;
    `}
`;
