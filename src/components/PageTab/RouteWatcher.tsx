// import React, { useEffect } from 'react';
// import { connect, Dispatch } from 'umi';
// import { ConnectState, TabState } from '@/models/connect';

// export interface UmiComponentProps {
//   children: React.ReactNode;
//   history: History;
//   location: any;
//   match: { isExact: boolean; params: Object; path: string; url: string };
//   route: any;
//   routes: any[];
//   tabs: TabState,
//   dispatch: Dispatch;
// }

// const RouteWatcher: React.FC<UmiComponentProps> = props => {
//   const { tabs: { tabList }, children, route, dispatch } = props;

//   const updateTabs = () => {
//     const exist = (tabList || []).find((item: {key: any} )=> item.key === route.path);
//     if (!exist) {
//       if (dispatch) {
//         dispatch({
//           type: 'tabs/addTabs',
//           payload: [{ children, key: route.path, name: route.name }],
//         });
//       }
//     }
//   };

//   useEffect(updateTabs, []);
//   return <></>;
// };

// export default connect(({ tabs }: ConnectState) => ({
//   tabs,
// }))(RouteWatcher);

import { RouteWatcher } from 'antd-pro-page-tabs';

export default RouteWatcher;