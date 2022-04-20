<template>
<div>
</div>
</template>

<script>
export default {
  name: 'ActivationSpacer',
  async mounted(){
    let fd = new FormData();
    fd.append('uid',this.$route.query.u);
    fd.append('token',this.$route.query.tk);
    try {
      await this.$API.user.activateUser(fd);
      localStorage.setItem('isEmailActivation', '1');
      await this.$router.push('/login');
    }catch (e) {
      await this.$router.push('/registration');
    }
  },
  data:()=>({
  }),
  methods:{
  },
};
</script>

<style scoped>

</style>