<template>
  <div>
      <form  action="">
          <label for="">Enter your new password</label>
          <input v-model="NewPass" type="password" name="" id="">
          <label for="">Confirm password</label>
          <input v-model="NewPassConfirm" type="password" name="" id="">
          <button @click="ConfirmPass">Confirm pass</button>
      </form>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
data()
{
    return{
        NewPass:"",
        NewPassConfirm:"",
    }
},
methods:{
    async ConfirmPass()
    {
        if((this.NewPass == this.NewPassConfirm) && this.NewPassConfirm && this.NewPass)
        {
            await firebase.auth().currentUser.updatePassword(this.NewPass).then(() => {
                alert("Pass updated successfully");
            }).catch(err => {
                console.log("Some Error is here "+ err);
            })
        }
        else
        {
            alert("Please fill the data carefully");
        }
    }
}
}
</script>

<style>

</style>