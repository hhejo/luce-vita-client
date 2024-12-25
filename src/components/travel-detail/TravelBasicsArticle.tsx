import { PropsWithChildren } from 'react';
import { TravelArticle } from '../common/TravelArticle';

type TravelBasicsArticleProps = {
  margin?: string;
  fontSize?: string;
  title: string;
};

export const TravelBasicsArticle: React.FC<PropsWithChildren<TravelBasicsArticleProps>> = ({
  margin,
  fontSize,
  title,
  children,
}) => {
  return (
    <TravelArticle margin={margin} fontSize={fontSize} title={title} titleColor="text-primary-100">
      {children}
    </TravelArticle>
  );
};