<template>
  <div>
  </div>
</template>

<script>
// import {mapMutations} from 'vuex';

export default {
  name: 't2FaDisableActivationSpacer',
  async mounted(){
    console.log('hui');
    let fd = new FormData();
    fd.append('uid',this.$route.query.u);
    fd.append('token',this.$route.query.tk);
    try {
      await this.$API.user.disable2Fa(fd);
      this.setUserData({is2faEnabled: false,});
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