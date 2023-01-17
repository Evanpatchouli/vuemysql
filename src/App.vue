<template>
  <div class="nav">
    <div class="toolbar">
      <div @click="switchTheme" id="theme">
        <img
          alt="theme"
          src="theme-to-light.png"
          style="height: 50px"
          id="themeimg"
        />
      </div>
      <div>
        <img
          alt="connection-user"
          src="user-light.png"
          style="height: 52px"
          id="userimg"
        />
      </div>
    </div>
  </div>
  <router-view />
</template>
<script>
export default {
  data() {
    return {
      theme: "light",
    };
  },
  methods: {
    switchTheme() {
      if (this.theme == "light") {
        document.documentElement.style.setProperty(
          "--most-backcolor",
          "#f5f8f8"
        );
        document.documentElement.style.setProperty(
          "--main-backcolor",
          "#ffffff"
        );
        document.documentElement.style.setProperty("--text-color", "#2c3e50");
        document.documentElement.style.setProperty(
          "--table-back-color-hover",
          "#f0f8ff"
        );
        document.documentElement.style.setProperty(
          "--table-text-color-hover",
          "#2977e3"
        );
        document.getElementById("themeimg").src = "theme-to-dark.png";
        document.getElementById("userimg").src = "user-dark.png";
        this.theme = "dark";
      } else {
        document.documentElement.style.setProperty(
          "--most-backcolor",
          "#1a1a1c"
        );
        document.documentElement.style.setProperty(
          "--main-backcolor",
          "#0a0a0a"
        );
        document.documentElement.style.setProperty("--text-color", "#f0f8ff");
        document.documentElement.style.setProperty(
          "--table-back-color-hover",
          "#50505451"
        );
        document.documentElement.style.setProperty(
          "--table-text-color-hover",
          "#46e046"
        );
        document.getElementById("themeimg").src = "theme-to-light.png";
        document.getElementById("userimg").src = "user-light.png";
        this.theme = "light";
      }
    },
  },
};
</script>
<style lang="scss">
:root {
  --most-backcolor: #1a1a1c;
  --text-color: #f0f8ff;
  --table-back-color-hover: #50505451;
  --table-text-color-hover: #46e046;
  --main-backcolor: #0a0a0a;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
  color: #f5f8f8;
  @media screen and (max-width: 1000px) {
    width: 1000px;
  }
}

.nav {
  text-align: left;
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  > .toolbar {
    > div {
      z-index: 100;
      margin-inline-end: 30px;
      display: inline-block;
    }

    > * {
      cursor: pointer;
    }
  }
}

* {
  background: var(--most-backcolor);
  color: var(--text-color);
  transition: all 0.3s ease;
}

::-webkit-scrollbar {
  display: none;
}

.table {
  background: var(--main-backcolor);
}
</style>
