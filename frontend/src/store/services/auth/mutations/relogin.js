import { updateSession, updateUserSession } from "../../../reducers/app/sessionReducer";
import { handleQueryError } from "../../ReduxDefault";

export const relogin = (builder) =>
  builder.mutation({
    query: () => ({
      url: "/auth/relogin",
      method: "POST",
    }),
    onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
      try {
        const res = await queryFulfilled;

        const {
          user,
          permissions,
          apiKey,
          roles,
          unreads,
          token_can,
        } = res.data;
        
        dispatch(updateUserSession({ user, permissions, apiKey, roles, token_can, notifys: unreads }));
        dispatch(updateSession({ key: "auth", value: true }));
      } catch (err) {
        handleQueryError(err, dispatch);
      }
    },
  });
