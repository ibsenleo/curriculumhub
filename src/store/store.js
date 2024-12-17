import { configureStore } from "@reduxjs/toolkit";
import { authMiddleware, authSlice } from "./auth";
import { configMiddleware, configSlice } from "./config";
import { resumeeSlice } from "./resumee";
import { authorSlice } from "./author/authorSlice";
import { staticDataSlice } from "./staticData/staticDataSlice";
import { expertiseSlice } from "./expertise/expertiseSlice";
import { certificationSlice } from "./certification";
import { experienceSlice } from "./experience";
import { skillSlice } from "./skill";
import { educationSlice } from "./education";
// import { groupSlice } from "./group";
// import { transactionsSlice } from "./transaction/transactionSlice";
// import { usersSlice } from "./users";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        config: configSlice.reducer,
        resumees: resumeeSlice.reducer,
        educations: educationSlice.reducer,
        expertise: expertiseSlice.reducer,
        certifications: certificationSlice.reducer,
        experiences: experienceSlice.reducer,
        skills:skillSlice.reducer,
        authors: authorSlice.reducer,
        staticData: staticDataSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authMiddleware)
    .concat(configMiddleware)
})