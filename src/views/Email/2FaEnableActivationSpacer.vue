<template>
  <div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';

export default {
  name: 't2FaEnableActivationSpacer',
  async mounted(){
    let fd = new FormData();
    fd.append('uid',this.$route.query.u);
    fd.append('token',this.$route.query.tk);
    try {
      await this.$API.user.enable2Fa(fd);
      this.setUserData({is2faEnabled: true,});
      await this.$router.push('/lk/security');
    }catch (e) {
      await this.$router.push('/registration');
    }
  },
  methods:{
    ...mapMutations(['setUserData',]),
  },
};
</script>

<style scoped>

</style>