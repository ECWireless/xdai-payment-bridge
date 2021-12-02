import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';

interface ITypograhpy {
  align?: 'left' | 'center' | 'right';
  underline?: boolean;
  uppercase?: boolean;
  weight?: number;
}

export const H1 = styled.h1<ITypograhpy>`
  display: block;
  font-size: 2.2rem;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
  ${media.xs`
		font-size: 2.6rem;
	`}
  ${media.lg`
		font-size: 3rem;
	`}
  ${(props) =>
    props.align &&
    css`
      text-align: ${props.align};
    `}
  ${(props) =>
    props.underline &&
    css`
      text-decoration: underline;
    `}
	${(props) =>
    props.uppercase &&
    css`
      text-transform: uppercase;
    `}
	${(props) =>
    props.weight &&
    css`
      font-weight: ${props.weight};
    `}
	${(props) => css`
    color: ${props.color};
  `}
`;

export const H2 = styled.h2<ITypograhpy>`
  display: block;
  font-size: 2.4rem;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
  ${media.lg`
		font-size: 3rem;
	`}
  ${(props) =>
    props.align &&
    css`
      text-align: ${props.align};
    `}
  ${(props) =>
    props.underline &&
    css`
      text-decoration: underline;
    `}
	${(props) =>
    props.uppercase &&
    css`
      text-transform: uppercase;
    `}
	${(props) =>
    props.weight &&
    css`
      font-weight: ${props.weight};
    `}
	${(props) => css`
    color: ${props.color};
  `}
`;

export const H3 = styled.h3<ITypograhpy>`
  display: block;
  font-size: 1.6rem;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;

  ${media.xs`
		font-size: 1.8rem;
	`}

  ${media.lg`
		font-size: 2rem;
	`}
  ${(props) =>
    props.align &&
    css`
      text-align: ${props.align};
    `}
  ${(props) =>
    props.underline &&
    css`
      text-decoration: underline;
    `}
	${(props) =>
    props.uppercase &&
    css`
      text-transform: uppercase;
    `}
	${(props) =>
    props.weight &&
    css`
      font-weight: ${props.weight};
    `}
	${(props) => css`
    color: ${props.color};
  `}
`;

export const P1 = styled.p<ITypograhpy>`
  display: block;
  font-size: 1.2rem;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
  line-height: 1.8;

  ${media.xs`
		font-size: 1.6rem;
	`}

  ${media.lg`
		font-size: 1.6rem;
	`}
  ${(props) =>
    props.align &&
    css`
      text-align: ${props.align};
    `}
  ${(props) =>
    props.underline &&
    css`
      text-decoration: underline;
    `}
	${(props) =>
    props.uppercase &&
    css`
      text-transform: uppercase;
    `}
	${(props) =>
    props.weight &&
    css`
      font-weight: ${props.weight};
    `}
	${(props) => css`
    color: ${props.color};
  `}
`;

export const P2 = styled.p<ITypograhpy>`
  display: block;
  font-size: 1.2rem;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
  line-height: 1.8;
  ${media.lg`
		font-size: 1.4rem;
	`}
  ${(props) =>
    props.align &&
    css`
      text-align: ${props.align};
    `}
  ${(props) =>
    props.underline &&
    css`
      text-decoration: underline;
    `}
	${(props) =>
    props.uppercase &&
    css`
      text-transform: uppercase;
    `}
	${(props) =>
    props.weight &&
    css`
      font-weight: ${props.weight};
    `}
	${(props) => css`
    color: ${props.color};
  `}
`;

export const P3 = styled.p<ITypograhpy>`
  display: block;
  font-size: 1rem;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
  line-height: 1.8;

  ${(props) =>
    props.align &&
    css`
      text-align: ${props.align};
    `}
  ${(props) =>
    props.underline &&
    css`
      text-decoration: underline;
    `}
	${(props) =>
    props.uppercase &&
    css`
      text-transform: uppercase;
    `}
	${(props) =>
    props.weight &&
    css`
      font-weight: ${props.weight};
    `}
	${(props) => css`
    color: ${props.color};
  `}
`;
