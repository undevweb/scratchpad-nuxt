export default ({ store, route, redirect }) => {

    // Check if user is connected first
    if ( !store.getters.loggedInUser || !store.state.auth.loggedIn) return redirect('/user/connection');

    if (!route.meta[0].roles
        || !store.getters.loggedInUser.roles
        || !store.getters.loggedInUser.roles.some(r => route.meta[0].roles.includes(r))
    ) {
        return redirect('/user/unauthorized');
    }

    // return error({
    //   statusCode: 401,
    //   message: 'Du måste vara admin för att besöka denna sidan.'
    // })
}
