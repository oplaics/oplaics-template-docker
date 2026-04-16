import { updateNotifer } from "../../../reducers/app/notifierReducer";
import { logoutSession } from "../../../reducers/app/sessionReducer";
import { handleQueryError } from "../../ReduxDefault";

export const logout = (builder) =>
  builder.mutation({
    query: ({ mode }) => ({
      url: mode !== 'all' ? "/auth/logout" : "/auth/logout-all",
      method: "GET",
    }),
    onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
      try {
        const res = await queryFulfilled;

        const { status, msg } = res.data;

        dispatch(logoutSession());
        dispatch(updateNotifer({ status: status, text: msg, variant: 'info' }));
      } catch (err) {
        handleQueryError(err, dispatch);
      }
    },
  });