export default {
    template: `
     <div class="book-filter">
         
         <div class="search">
                <img class="logo-img" src="./../img/logo.png"/>
                <label>Search & Filter</label>
                <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search...">
            </div>
            <form class="filter">
                <input  v-model.number.lazy="filterBy.fromPrice" type="number" placeholder="From...">
                <input  v-model.number.lazy="filterBy.toPrice" type="number" placeholder="To...">
                <button @click.prevent="filter">Filter price</button>
            </form>
        </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: '',
                toPrice: Infinity
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', {...this.filterBy });
        }
    }
}