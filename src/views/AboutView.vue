<template>
  <div class="AboutView">
    <div>About</div>
    <div>
      <div>
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
    </div>
  </div>
  <a-table :dataSource="users" :columns="columns">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'id'">
        <span>
          <smile-outlined />
          <a-button>{{ column.key }}</a-button>
        </span>
      </template>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          <a-button>{{ record.name }}</a-button>
        </a>
      </template>
    </template>
  </a-table>
</template>
<script>
export default {
  name: "AboutView",
  components: {},
  data() {
    return {
      users: [],
      columns: [
        { slot: { title: "id" }, dataIndex: "id", key: "id" },
        { title: "name", dataIndex: "name", key: "name" },
        { title: "pwd", dataIndex: "pwd", key: "pwd" },
      ],
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
