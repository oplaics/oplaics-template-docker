import { writeStorage } from "../../../../components/utils/storage";
import { updateNotifer } from "../../../reducers/app/notifierReducer";
import { updateSession, updateUserSession } from "../../../reducers/app/sessionReducer";
import { handleQueryError } from "../../ReduxDefault";

export const login = (builder) =>
  builder.mutation({
    query: ({ body }) => ({
      url: "/auth/login",
      method: "POST",
      body,
    }),
    onQueryStarted: async ({ body }, { queryFulfilled, dispatch }) => {
      try {
        const res = await queryFulfilled;

        const {
          status,
          msg,
          user,
          permissions,
          apiKey,
          roles,
          unreads,
          token_can,
        } = res.data;
        
        dispatch(updateUserSession({ user, permissions, apiKey, roles, token_can, notifys: unreads }));
        dispatch(updateSession({ key: "auth", value: true }));
        
        writeStorage("session.apiKey", apiKey, body.remember ?? false);
        dispatch(updateNotifer({ status, text: msg }));
      } catch (err) {
        handleQueryError(err, dispatch);
      }
    },
  });
