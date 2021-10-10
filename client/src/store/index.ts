import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { orderDetailReducer } from "../reducers/currentOrderReducer";
import { orderReducer } from './../reducers/orderReducer';


const rootReducer = combineReducers({
  orders: orderReducer,
  orderDetail: orderDetailReducer
});
export type RootState = ReturnType<typeof rootReducer>

// create slice for getting jsonplaceholder
export function createStore(){
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:false,
    }),
  });

  return store;
}