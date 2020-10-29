import React, { useContext, useEffect } from 'react';
import { context } from './context';
import { CONTEXT_ACTIONS, UmiComponentProps } from './types';
import { isLocationChanged } from './utils';

const RouteWatcher: React.FC<UmiComponentProps> = props => {
  const store = useContext(context);
  const { tabs, dispatch } = store;
  const { children, route, location } = props;

  const updateTabs = () => {
    const newTabs = [...tabs];
    // 通过pathname来判断是否是新tab页面：存在多个路由共用同个组件的情况
    const exists = newTabs.find(t => t.location.pathname === location);
    const tab = { route, location, children };
    if (!exists) {
      newTabs.push(tab);
    } else {
      // if tab of same route alreay exists and location change, replace the old with the new one
      if (isLocationChanged(exists.location, location)) {
        newTabs.splice(newTabs.indexOf(exists), 1, tab);
      }
    }
    dispatch({
      type: CONTEXT_ACTIONS.UPDATE_TABS,
      payload: newTabs,
    });
  };

  useEffect(updateTabs, []);
  return <></>;
};

export default RouteWatcher;
