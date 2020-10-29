import React from 'react';
import { Link } from 'umi';
import { Divider } from 'antd';

interface TabsProps {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
}

const Tabs: React.FC<TabsProps> = () => {
  return (
    <>
      <Link to="/tabs/detail/1">查询表格1</Link>
      <Divider />
      <Link to="/tabs/detail/2">查询表格2</Link>
    </>
  )
}

export default Tabs;