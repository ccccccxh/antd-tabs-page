import React from 'react';
import { connect, Dispatch, history } from 'umi';
import { Tabs } from 'antd';
import { ConnectState, TabState } from '@/models/connect';

import Styles from './style.less';

const { TabPane } = Tabs;

const TabsLayout: React.FC<{
  location: any;
  history: any;
  children: React.ReactNode;
  tabs: TabState,
  dispatch: Dispatch;
}> = props => {
  const { tabs: { tabList, currentKey }, dispatch, children, location } = props;

  // 多标签页相关方法
  const handleRemoveTab = (tabKey: string | MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>, action: 'add' | 'remove') => {
    if (action === 'remove') {
      if (dispatch) {
        dispatch({
          type: 'tabs/closeTab',
          payload: tabKey,
        });
      }
    }
  }

  const handleChangeTab = (tabKey: string) => {
    if (dispatch) {
      dispatch({
        type: 'tabs/setCurrentKey',
        payload: tabKey,
      });
      history.push(tabKey);
    }
  }

  return (
    <Tabs
      hideAdd
      type="editable-card"
      className={Styles.tabPanel}
      onEdit={handleRemoveTab}
      onChange={handleChangeTab}
      activeKey={currentKey}
    >
      {(tabList || []).map((panel: any) => (
        <TabPane tab={panel.name} key={panel.key}>
          {
            panel.children
          }
        </TabPane>
      ))}
      {(tabList || []).find((tab: any) => tab.key === location.pathname) ? children : null}
    </Tabs>
  )
}

export default connect(({ tabs }: ConnectState) => ({
  tabs,
}))(TabsLayout);