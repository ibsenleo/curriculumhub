import { configureStore } from "@reduxjs/toolkit";
import { authMiddleware, authSlice } from "./auth";
import { configMiddleware, configSlice } from "./config";
import { resumeeSlice } from "./resumee";
import { authorSlice } from "./author/authorSlice";
import { staticDataSlice } from "./staticData/staticDataSlice";
import { expertiseSlice } from "./expertise/expertiseSlice";
// import { groupSlice } from "./group";
// import { transactionsSlice } from "./transaction/transactionSlice";
// import { usersSlice } from "./users";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        config: configSlice.reducer,
        resumees: resumeeSlice.reducer,
        expertise: expertiseSlice.reducer,
        authors: authorSlice.reducer,
        staticData: staticDataSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authMiddleware)
    .concat(configMiddleware)
})