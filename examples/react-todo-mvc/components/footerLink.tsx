import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

export interface ILinkPropsInterface {
  url: string;
  text: string;
  activeOnlyWhenExact?: boolean;
}
export function FooterLink({ url, text, activeOnlyWhenExact = false }: ILinkPropsInterface) {
  const match = useRouteMatch({
    path: url,
    exact: activeOnlyWhenExact,
  });
  return (
    <Link className={match ? 'selected' : ''} to={url}>
      {text}
    </Link>
  );
}
