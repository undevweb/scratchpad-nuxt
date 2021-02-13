export default ({ store, route, redirect }) => {
    if ( !store.getters.loggedInUser || !store.state.auth.loggedIn) return redirect('/user/connection');
}
