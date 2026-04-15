import { writeStorage } from "../../../../components/utils/storage";
import { updateUserSession } from "../../../reducers/app/sessionReducer";
import { handleQueryError } from "../../ReduxDefault";

export const tfa = (builder) =>
  builder.mutation({
    query: ({ body }) => ({
      url: "/auth/2fa",
      method: "POST",
      body,
    }),
    onQueryStarted: async ({ body }, { queryFulfilled, dispatch }) => {
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
        
        writeStorage("session.apiKey", apiKey, body.remember ?? false);
      } catch (err) {
        handleQueryError(err, dispatch);
      }
    },
  });
