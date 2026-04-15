import { updateNotifer } from "../../../reducers/app/notifierReducer";
import { handleQueryError } from "../../ReduxDefault";

export const resendCode2FA = (builder) =>
  builder.mutation({
    query: ({ body }) => ({
      url: "/auth/2fa/resend",
      method: "POST",
      body,
    }),
    onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
      try {
        const res = await queryFulfilled;

        const {
          status,
          msg,
        } = res.data;
        
        dispatch(updateNotifer({ status: status, text: msg }));
      } catch (err) {
        handleQueryError(err, dispatch);
      }
    },
  });
