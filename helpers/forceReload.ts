import Router from "next/router";
// Make a call to the client to fetch to current path, witch will rerender
export const forceReload = () => {
    Router.reload();
};
