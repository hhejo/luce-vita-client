/**
 * 공통 컴포넌트의 Props 타입들을 정의하고 있는 파일입니다.
 */
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type IconInfo = {
  // Font Awesome 아이콘에 대한 이름 (카멜 표기법)
  id: IconDefinition;
  // 아이콘의 의미에 대한 설명 (Accessibility 관련)
  title: string;
  // 라우터 경로
  route?: string;
};

export type TopNavProps = {
  iconInfos: IconInfo[];
  bgColor: string;
  iconColor: string;
  title: string;
  titleColor: string;
};

export type TravelArticleProps = {
  margin?: string;
  fontSize?: string;
  title: string;
  titleColor: string;
};

export type InputProps = {
  type: string;
  name: string;
  bgColor: string;
  borderColor: string;
  placeholder?: string;
};

export type FullWidthButtonProps = {
  type: 'button' | 'submit';
  margin?: string;
  bgColor: string;
  textColor: string;
};
