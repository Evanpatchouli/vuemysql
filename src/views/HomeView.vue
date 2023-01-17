<template>
  <div class="Home">
    <div class="box">
      <div class="left">
        <div class="connANDuser">
          <img
            src="conn-on.png"
            @click="handleConnect"
            alt="connect"
            id="turn"
          />
          <div id="user">
            <div id="url">localhost:3306</div>
            <div id="name">root</div>
          </div>
        </div>
        <div class="db">
          <a-menu id="dbmenu" mode="inline">
            <a-sub-menu
              @titleClick="titleClick(index)"
              v-for="(item, index) in dbs"
              :key="index"
            >
              <template #icon>
                <DatabaseOutlined />
              </template>
              <template #title
                ><span style="font-weight: 900">{{
                  item.dbname
                }}</span></template
              >
              <a-menu-item
                v-for="e in item.tbs"
                :key="e"
                @click="getTbData(item.dbname, e.tbname)"
                >{{ e.tbname }}</a-menu-item
              >
            </a-sub-menu>
          </a-menu>
          <!-- <a-table :dataSource="users" :columns="columns" /> -->
        </div>
      </div>
      <div class="main">
        <div class="table">
          <a-table
            :dataSource="users"
            :pagination="{ pageSize: 9 }"
            :scroll="{ x: 'max-content', y: clientHeight }"
          >
            <!-- :columns="userStruct" -->
            <!-- <a-table-column key="id" title="id" data-index="id" />
            <a-table-column key="name" title="name" data-index="name" /> -->
            <a-table-column
              v-for="item in userStruct"
              :key="item.Field"
              :data-index="item.Field"
              @resizeColumn="handleResizeColumn"
            >
              <template #title
                ><span
                  style="
                    background: var(--text-backcolor);
                    color: var(--most-backlolor);
                  "
                  >{{ item.Field }}</span
                >
              </template>
              <template #default="{ text: content }">
                <!-- :getPopupContainer="
                    (triggerNode) => {
                      return triggerNode.parentNode;
                    }
                  " -->
                <a-popover
                  id="ziduanInfo"
                  title="字段信息"
                  placement="right"
                  trigger="hover"
                >
                  <template #content>
                    <p>类型: {{ item.Type }}</p>
                    <p>键型: {{ item.Key }}</p>
                    <p>非空: {{ item.Null }}</p>
                    <p>字符集: {{ item.Collation }}</p>
                    <p>默认值: {{ item.Default }}</p>
                    <p>权限: {{ item.Privileges }}</p>
                    <p>其他: {{ item.Extra }}</p>
                    <p>描述: {{ item.Comment }}</p>
                  </template>
                  <span class="table-cell-content">{{ content }}</span>
                </a-popover>
              </template>
            </a-table-column>
          </a-table>
          <!-- <table>
            <thead>
              <tr>
                <th
                  v-for="(value, key, index) in users[0]"
                  :key="index"
                  scope="col"
                >
                  {{ key }}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in users" :key="index">
                <td v-for="(obj, item) in item" :key="item" scope="row">
                  <a-popover
                    title="字段信息"
                    placement="rightBottom"
                    trigger="hover"
                    :getPopupContainer="
                      (triggerNode) => {
                        return triggerNode.parentNode;
                      }
                    "
                  >
                    <template #content>
                      <p>类型: varchar(60)</p>
                      <p>主键: 否</p>
                      <p>外键: 无</p>
                      <p>自增: 无</p>
                      <p>描述: 用户密码</p>
                    </template>
                    <div class="table-cell-content">{{ obj }}</div>
                  </a-popover>
                </td>
              </tr>
            </tbody>
          </table> -->
        </div>
        <div class="foot">@Evanpatchouli</div>
      </div>
      <div class="right">
        工具栏
        <div style="width: 60px">导出</div>
      </div>
    </div>
  </div>
</template>
<script>
import { DatabaseOutlined } from "@ant-design/icons-vue";
import VueDraggableResizable from "vue-draggable-resizable";
let clientHeight = 500;
function resetWidth() {
  let h = document.documentElement.clientHeight;
  clientHeight = h;
  console.log(clientHeight);
  // let eleh = document.getElementById("h");
  // eleh.innerHTML = "h: " + h + "px";
  let w = document.documentElement.clientWidth;
  // let elew = document.getElementById("w");
  // elew.innerHTML = "w: " + w + "px";
  document.documentElement.style.setProperty("--w", w + "px");
  document.documentElement.style.setProperty("--h", h - 97 + "px");
}
const debounce = (fn, delay) => {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
};
const cancalDebounce = debounce(resetWidth, 0);

export { clientHeight };

window.addEventListener("resize", cancalDebounce);

export default {
  name: "HomeView",
  // eslint-disable-next-line vue/no-unused-components
  components: { DatabaseOutlined, VueDraggableResizable },
  data() {
    return {
      clientHeight: clientHeight,
      conn: {
        status: "off",
      },
      dbs: [],
      users: [],
      userStruct: [
        {
          Field: "id",
          Type: "int(11)",
          Null: "NO",
          Key: "PRI",
          Default: "NULL",
          Comment: "备注",
          Extra: "自增",
          Privileges: "select,insert,update,references",
          Collation: "NULL",
        },
        {
          Field: "name",
          Type: "varchar(60)",
          Null: "YES",
          Key: "name",
          Default: "NULL",
          Comment: "备注",
          Extra: "NULL",
          Privileges: "select,insert,update,references",
          Collation: "utf8_general_ci",
        },
        {
          Field: "pwd",
          Type: "varchar(60)",
          Null: "YES",
          Key: "pwd",
          Default: "NULL",
          Comment: "备注",
          Extra: "NULL",
          Privileges: "select,insert,update,references",
          Collation: "utf8_general_ci",
        },
      ],
      columns: [
        { title: "id", dataIndex: "id", key: "id" },
        { title: "name", dataIndex: "name", key: "name" },
        { title: "pwd", dataIndex: "pwd", key: "pwd" },
      ],
      handleResizeColumn: (w, col) => {
        col.width = w;
      },
    };
  },
  mounted() {
    this.getDbs();
    this.getUsers();
    let h = document.documentElement.clientHeight;
    document.documentElement.style.setProperty("--h", h - 100 + "px");
    // let eleh = document.getElementById("h");
    // eleh.innerHTML = "h: " + h + "px";
    let w = document.documentElement.clientWidth;
    // let elew = document.getElementById("w");
    // elew.innerHTML = "w: " + w + "px";
    document.documentElement.style.setProperty("--w", w + "px");
    document.getElementById("url").style.color = "#b7b7cb";
    document.getElementById("name").style.color = "#b7b7cb";
    window.onresize = () => {
      console.log("高度");
      //屏幕尺寸变化
      return (() => {
        this.clientHeight = document.documentElement.clientHeight - 200;
      })();
    };
  },
  methods: {
    getDbs() {
      fetch("http://localhost:3000/dbs", {
        method: "get",
      })
        .then((res) => {
          return res.text();
        })
        .then((data) => {
          this.dbs = JSON.parse(data).res;
          // console.log(data);
          console.log(this.dbs);
        });
    },
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
    handleConnect() {
      if (this.conn.status == "off") {
        document.getElementById("turn").src = "conn-off.png";
        let mainbackcolor =
          document.documentElement.style.getPropertyValue("--most-backcolor");
        if (mainbackcolor == "#1a1a1c") {
          document.getElementById("url").style.color = "#ffffff";
          document.getElementById("name").style.color = "#ffffff";
        } else {
          document.getElementById("url").style.color = "#46e046";
          document.getElementById("name").style.color = "#46e046";
        }
        this.conn.status = "on";
      } else {
        document.getElementById("turn").src = "conn-on.png";
        document.getElementById("url").style.color = "#b7b7cb";
        document.getElementById("name").style.color = "#b7b7cb";
        this.conn.status = "off";
      }
    },
    titleClick(index) {
      let baseURL = "http://localhost:3000/tbs?dbname=";
      let url = baseURL + this.dbs[index].dbname;
      fetch(url, {
        method: "get",
      })
        .then((res) => {
          return res.text();
        })
        .then((data) => {
          data = JSON.parse(data).res;
          this.dbs[index].tbs = data;
          console.log(this.dbs[index]);
        });
    },
    getTbData(dbname, tbname) {
      let baseURL = "http://localhost:3000/";
      let url = baseURL + "tbData?" + "dbname=" + dbname + "&tbname=" + tbname;
      fetch(url, {
        method: "get",
      })
        .then((res) => {
          return res.text();
        })
        .then((data) => {
          data = JSON.parse(data).res;
          console.log("tableData:");
          console.log(data);
          this.users = data;
        });
      let url2 =
        baseURL + "tbConstruct?" + "dbname=" + dbname + "&tbname=" + tbname;
      fetch(url2, {
        method: "get",
      })
        .then((res) => {
          return res.text();
        })
        .then((data) => {
          data = JSON.parse(data).res;
          console.log("tableConstruct:");
          console.log(data);
          this.userStruct = data;
        });
    },
  },
  watch: {
    clientHeight: function (newVal, oldVal) {
      console.log("newVal: " + newVal + " oldVal: " + oldVal);
    },
  },
};
</script>
<style lang="scss" scoped>
:root {
  --h: 100px;
  --w: 1000px;
}

// .test {
//   display: none;
// }

.box {
  transition: all 0.3s ease;
  height: var(--h);
  @media screen and (max-height: 300px) {
    height: 200px;
  }

  > div {
    float: left;
  }

  // div {
  //   border: 1px black solid;
  // }

  .left {
    width: 20vw;
    transition: all 0.3s ease;
    @media screen and (max-width: 800px) {
      width: 160px;
    }
    @media screen and (min-width: 1000px) {
      width: 200px;
    }
  }
}
:deep .ant-menu-title-content {
  background-color: rgba(0, 0, 0, 0);
}

:deep .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  .ant-menu-title-content {
    color: black;
  }
}

.connANDuser {
  position: relative;
  height: 10vh;
  transition: all 0.3s ease;
  @media screen and (max-height: 500px) {
    height: 50px;
  }
  @media screen and (min-height: 650px) {
    height: 65px;
  }

  > #turn {
    z-index: 2;
    left: 9px;
    width: 50px;
    height: 50px;
    @media screen and (max-height: 500px) {
      top: 0;
    }
    @media screen and (min-height: 650px) {
      top: 7.5px;
    }
    &:hover {
      cursor: pointer;
    }
  }

  > * {
    position: absolute;
    top: 0;
    top: 1%;
  }

  > #user {
    left: 50px;
    @media screen and (max-height: 500px) {
      top: 0px;
    }
    @media screen and (min-height: 650px) {
      top: 7px;
    }
    @media screen and (max-width: 1000px) {
      right: 2.5%;
      @media screen and (max-width: 800px) {
        left: 50px;
      }
    }
    @media screen and (min-width: 1000px) {
      left: 66.5px;
    }
    color: #dcdcdc;

    &:hover {
      cursor: pointer;
    }
  }
}

.db {
  transition: all 0.3s ease;
  position: relative;
  overflow: scroll;
  height: calc(var(--h) * 0.9 - 10px - 5px);
  @media screen and (max-height: 500px) {
    height: calc((var(--h) - 50px - 5px));
    @media screen and (max-height: 300px) {
      height: 145px;
    }
  }
  @media screen and (min-height: 650px) {
    height: calc((var(--h) - 65px - 5px));
  }
}

#dbmenu {
  width: 105%;
}

.main {
  width: calc(var(--w) - 350px);
  @media screen and (max-width: 1000px) {
    width: 650px;
  }
  margin-left: 0.5vw;

  height: 99.5%;

  @media screen and (max-height: 300px) {
    height: 198px;
  }

  // overflow: hidden;

  .table {
    height: 90%;
    @media screen and (max-height: 300px) {
      height: 178px;
    }
  }

  .foot {
    line-height: 100%;
    z-index: 3;
    position: relative;
    top: 2%;
    height: 6%;
    @media screen and (max-height: 300px) {
      top: 5px;
      height: 10px;
    }
  }
}

::v-deep .ant-popover-title {
  color: var(--text-color);
  // color: white;
}

::v-deep .ant-popover {
  z-index: 10000;
}

::v-deep .ant-table-tbody > tr.ant-table-row:hover > td,
.ant-table-tbody > tr > td.ant-table_cell-row-hover {
  background: var(--table-back-color-hover);
  .table-cell-content {
    color: var(--table-text-color-hover);
    &:hover {
      cursor: pointer;
    }
  }
}

:deep .table {
  position: relative;
  bottom: 0;
}

:deep .ant-table-pagination.ant-pagination {
  position: absolute;
  top: calc(100% - 50px);
  right: 0;
  @media screen and (min-height: 650px) {
    top: calc(100% - 0px);
  }
}
// #app > div.Home > div > div.main > div.table > div > div > div > ul

:deep .table-cell-content {
  background-color: rgba(0, 0, 0, 0);
}

.right {
  width: 90px;
  margin-left: 1vw;
  > * {
    margin: auto;
  }
}

table,
tr,
td {
  border: 1px black solid;
}
</style>
<!-- <style lang="scss">
:deep a-menu-item {
  background: rgba(0, 0, 0, 0);
}
</style> -->
