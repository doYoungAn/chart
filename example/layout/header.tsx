import React, { FC } from 'react';

interface IHeaderProps {}

const Header: FC<IHeaderProps> = (): JSX.Element => {

  return (
    <>
      <div className="header">
        Custom charts
      </div>
    </>
  );

}

export default Header;
