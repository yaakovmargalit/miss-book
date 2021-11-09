export default {
    props: ['authors'],
    template: `
    <div class="authors">
      <p>By:</p>
        <ul>
            <li v-for="author in authors">
                <h6>{{author}}</h6>
            </li>
        </ul>
</div>
    `
}