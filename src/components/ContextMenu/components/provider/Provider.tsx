import React, { memo, useEffect, useMemo } from 'react';
import { PortalProvider } from '@gorhom/portal';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { InternalContext } from '../../context/internal';
import { Feather } from '@expo/vector-icons';
import { Backdrop } from '../backdrop/Backdrop';
import { HoldMenuProviderProps } from './types';
import { StateProps, Action } from './reducer';
import { CONTEXT_MENU_STATE } from '../../constants';
import { MenuInternalProps } from '../menu/types';
import { Menu } from '../menu/Menu';
export interface Store {
  state: StateProps;
  dispatch?: React.Dispatch<Action>;
}

const ProviderComponent = ({
  children,
  theme: selectedTheme,
  iconComponent,
}: HoldMenuProviderProps) => {
  const state = useSharedValue<CONTEXT_MENU_STATE>(
    CONTEXT_MENU_STATE.UNDETERMINED
  );
  const theme = useSharedValue<'light' | 'dark'>(selectedTheme || 'light');
  const menuProps = useSharedValue<MenuInternalProps>({
    itemHeight: 0,
    itemWidth: 0,
    itemX: 0,
    itemY: 0,
    items: [],
    anchorPosition: 'top-center',
    menuHeight: 0,
    transformValue: 0,
    actionParams: {},
  });

  useEffect(() => {
    theme.value = selectedTheme || 'light';
  }, [selectedTheme]);

  const internalContextVariables = useMemo(
    () => ({
      state,
      theme,
      menuProps,
      IconComponent:
        Animated.createAnimatedComponent<typeof Feather>(iconComponent),
    }),
    [state, theme, menuProps]
  );

  return (
    <InternalContext.Provider value={internalContextVariables}>
      <PortalProvider>
        {children}
        <Backdrop />
        <Menu />
      </PortalProvider>
    </InternalContext.Provider>
  );
};

export const ContextMenuProvider = memo(ProviderComponent);
