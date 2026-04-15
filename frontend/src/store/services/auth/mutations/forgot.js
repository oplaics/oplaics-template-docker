import { updateNotifer } from "../../../reducers/app/notifierReducer";
import { handleQueryError } from "../../ReduxDefault";

export const forgot = (builder) =>
  builder.mutation({
    query: ({ body }) => ({
      url: "/auth/security/email/send",
      method: "POST",
      body,
    }),
    onQueryStarted: async ({ setError }, { queryFulfilled, dispatch }) => {
      try {
        const res = await queryFulfilled;

        const {
          status,
          msg,
        } = res.data;
        
        dispatch(updateNotifer({ status: status, text: msg }));
      } catch (err) {
        handleQueryError(err, dispatch, setError);
      }
    },
  });
