export default {
    template: `
        <header class="app-header">
        <h1 class="logo">Miss Book</h1>
            <nav>
                <router-link to="/" active-class="active-link" exact>Home</router-link> |
                <router-link to="/book">books</router-link> |
                <router-link to="/about">About</router-link>
            </nav>
        </header>
    `,
}