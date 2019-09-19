// @flow
import { NavigationActions, StackActions } from 'react-navigation';

let navigator;

const setTopLevelNavigator = (navigatorRef: any) => {
  navigator = navigatorRef;
};

function navigate(routeName: string, params?: Object) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function getActiveRoute(navigationState: any) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRoute(route);
  }
  return route;
}

function replace(routeName: string, params?: Object, action?: any) {
  navigator.dispatch(
    StackActions.replace({
      routeName,
      params,
      action,
    }),
  );
}

function reset(routeName: string) {
  navigate(routeName);

  const resetAction = StackActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName })],
  });

  navigator.dispatch(resetAction);
}

export default {
  replace,
  reset,
  navigate,
  setTopLevelNavigator,
  getActiveRoute,
};