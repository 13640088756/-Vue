export default {
    saveUsername(context, username) {
        context.commit('saveUsername', username)
    },
    saveCartCount(context, cartcount) {
        context.commit('saveCartCount', cartcount)
    }
}