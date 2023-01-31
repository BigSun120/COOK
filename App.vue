<script>
  export default {
    onLaunch: async function() {
      console.log('App Launch')


      const token = uni.getStorageSync('token');
      // console.log('Qaaa', token);
      if (!token) return
      const res = await this.$api.users.getUserInfo({
        token
      });
      // console.log('用户消息res[0]', res[0]);
      if (res) {
        this.$store.commit('SET_USER_INFO', res)
        this.$store.commit('SET_TOKEN', token)
      }
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style lang="scss">
  /*每个页面公共css */
  /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
  @import "@/uni_modules/uview-ui/index.scss";

  page {
    height: 100%;
  }

  * {
    padding: 0;
    margin: 0;
  }
</style>
