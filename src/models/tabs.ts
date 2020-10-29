import { Effect, Reducer } from 'umi';
import { ConnectState } from './connect.d';

export interface TabModel {
  name: '',
  key: '',
  children: React.ReactNode,
}

export interface TabState {
  currentKey?: '',
  tabList?: [],
}

export interface UserModelType {
  namespace: 'tabs';
  state: TabState;
  effects: {
    addTabs: Effect;
    closeTab: Effect;
    closeAllTabs: Effect;
  };
  reducers: {
    setCurrentKey: Reducer<TabState>;
    setTabList: Reducer<TabState>;
  };
}

const TabsModel: UserModelType = {
  namespace: 'tabs',
  
  state: {
    currentKey: '',
    tabList: [],
  },

  effects: {
    *addTabs({ payload }, { select, put }) {
      const tabList: TabModel[] = yield select((state: ConnectState) => state.tabs.tabList);
      // payload 传参数需要注意
      const newTabList = tabList.concat(payload);
      yield put ({
        type: 'setTabList',
        payload: newTabList,
      })
    },
    *closeTab({ payload }, { select, put }) {
      // payload传参只是单个key值
      const { tabList, currentKey } = yield select((state: ConnectState) => state.tabs);
      const delIndex = tabList.findIndex((item: TabModel) => item.key === payload);
      const newTabList = tabList.splice(delIndex, 1);
      if(currentKey === payload){
        let newCurKey = '';
        const len = newTabList?.length || 0;
        if(newTabList?.length === delIndex) {
          // 删除的是最后一个tab
          newCurKey = newTabList?.[len - 1]?.key || ''
        } else {
          newCurKey = newTabList[delIndex].key;
        }
        yield put({
          type: 'setCurrentKey',
          payload: newCurKey,
        })
      }
      yield put({
        type: 'setTabList',
        payload: newTabList,
      })
    },
    *closeAllTabs(_, { put }) {
      yield put ({
        type: 'setTabList',
        payload: [],
      })
      yield put({
        type: 'setCurrentKey',
        payload: '',
      })
    },
  },

  reducers: {
    setCurrentKey(state, { payload }) {
      return {
        ...state,
        currentKey: payload,
      }
    },
    setTabList(state, { payload }) {
      return {
        ...state,
        tabList: payload,
      }
    }
  }
}

export default TabsModel;