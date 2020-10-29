import React from 'react';

interface TabsProps {
  match: {
    url: string;
    path: string;
    params: {
      id: string;
    };
  };
  location: {
    pathname: string;
    search: string;
  };
}

const Detail: React.FC<TabsProps> = (props) => {
  const { match, search } = props;
  const { params: { id } } = match; 
  return (
    <>
      show id : {id}
    </>
  )
}

export default Detail;