import { persistStore } from 'redux-persist'

// Keep auth info in local storage
export default (store) => {

    persistStore(store, {
        whitelist: ['auth']
    });
};
