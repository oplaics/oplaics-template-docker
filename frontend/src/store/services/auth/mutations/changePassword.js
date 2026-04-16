import { updateNotifer } from "../../../reducers/app/notifierReducer";
import { handleQueryError } from "../../ReduxDefault";

export const changePassword = (builder) =>
  builder.mutation({
    query: ({ body }) => ({
      url: "/auth/security/password/update",
      method: "POST",
      body,
    }),
    onQueryStarted: async ({ setError, callback }, { queryFulfilled, dispatch }) => {
      try {
        const res = await queryFulfilled;

        const {
          status,
          msg,
        } = res.data;
        
        dispatch(updateNotifer({ status: status, text: msg }));

        callback && callback();
      } catch (err) {
        handleQueryError(err, dispatch, setError);
      }
    },
  });
