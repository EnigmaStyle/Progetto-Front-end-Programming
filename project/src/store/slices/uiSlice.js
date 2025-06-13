import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isMenuOpen: false,
    isSearchOpen: false,
    isAccountMenuOpen: false,
    isProductsMenuOpen: false,
    notifications: [],
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    toggleAccountMenu: (state) => {
      state.isAccountMenuOpen = !state.isAccountMenuOpen;
    },
    toggleProductsMenu: (state) => {
      state.isProductsMenuOpen = !state.isProductsMenuOpen;
    },
    closeAllMenus: (state) => {
      state.isMenuOpen = false;
      state.isSearchOpen = false;
      state.isAccountMenuOpen = false;
      state.isProductsMenuOpen = false;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
  },
});

export const {
  toggleMenu,
  toggleSearch,
  toggleAccountMenu,
  toggleProductsMenu,
  closeAllMenus,
  addNotification,
  removeNotification,
} = uiSlice.actions;

export default uiSlice.reducer;