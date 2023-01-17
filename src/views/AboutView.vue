<template>
  <div class="AboutView">
    <div>About</div>
    <table>
      <tr>
        <td>id</td>
        <td>name</td>
        <td>password</td>
      </tr>
      <tr v-for="(item, index) in users" :key="index">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.pwd }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "AboutView",
  components: {},
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      fetch("http://localhost:3000/users", {
        method: "get",
      })
        .then((res) => {
          return res.text();
        })
        .then((data) => {
          this.users = JSON.parse(data).res;
          // console.log(data);
          console.log(this.users);
        });
    },
  },
};
</script>
<style scoped>
table,
tr,
td {
  border: 1px black solid;
}
</style>
