<template>
  <v-sheet style="margin-top:10%">
    <v-row>
      <v-col>
          <v-avatar size="100" cols="2" class="mx-0 px-0">
            <img :src="
            CurrentImgUrl ? CurrentImgUrl : '/img/icons/pexels-pixabay-220453.jpg'
            " alt="" style="object-fit: cover" />
          </v-avatar>
      </v-col>
      
      <v-col cols="8" align = "center">
        <v-btn v-if="!UpdateMyProfile" @click="Update" class="primary mt-2">Change Profile Photo</v-btn>
        <input
          @change="BrowsePhoto"
          type="file"
          enctype="multipart/form-data"
          style="display: none"
          accept="image/*"
          ref="input1"
        />
        <v-btn @click="Remove" v-if="!UpdateMyProfile" class="primary mt-2">Remove</v-btn>
        <v-btn @click="UploadPhoto" v-if="UpdateMyProfile" class="primary mt-2">Save</v-btn>
        <v-btn @click="DiscardPhoto" v-if="UpdateMyProfile" class="primary mt-2">Discard</v-btn>
      </v-col>
    </v-row>
    <v-form style="margin-top:10%">
      <v-row>
        <v-col>
          <label for="FirstName" class="font-weight-bold">First Name: </label>
          <span v-if="!EditFlag" class="text-subtitle-1">{{ FirstName }}</span>
          <v-text-field v-if="EditFlag" v-model="FirstName"></v-text-field>
          <br>
          <label for="FirstName" class="font-weight-bold">Last Name: </label>
          <span v-if="!EditFlag">{{ LastName }}</span>
          <v-text-field v-if="EditFlag" v-model="LastName"></v-text-field>
        </v-col>
      </v-row>
      <v-col>
        <label for="FirstName">User Bio</label>
        <span v-if="!EditFlag">{{ UserBio }}</span>
        <v-textarea
          v-if="EditFlag"
          v-model="UserBio"
          aria-placeholder="User Bio"
        ></v-textarea>
      </v-col>
      <v-row justify="space-around">
        <v-btn v-if="!EditFlag" @click="Edit">Edit</v-btn>
        <v-btn v-if="EditFlag" @click="Save">Save</v-btn>
        <v-btn v-if="EditFlag" @click="DiscardEdit">Discard</v-btn>
      </v-row>
    </v-form>
    <v-btn v-if="!UpdatePassFlag" @click="UpdatePass">Update Pass</v-btn>
    <v-form v-if="UpdatePassFlag">
      <label>Enter New Pass</label>
      <v-text-field type="password" v-model="NewPass"></v-text-field>
      <label>ConfirmPass</label>
      <v-text-field v-model="ConfirmPass" type="password"></v-text-field>
      <v-btn @click="SaveNewPass">Save</v-btn>
      <v-btn @click="DiscardPass">Discard</v-btn>
    </v-form>
    <v-btn @click="SignOut">Sign Out</v-btn>
  </v-sheet>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import firebase from "firebase";

export default {
  data() {
    return {
      FirstName: "",
      LastName: "",
      UserBio: "",
      NewPass: "",
      UpdatePassFlag: false,
      ConfirmPass: "",
      UpdateMyProfile: false,
      CurrentImgUrl: "",
      EditFlag: false,
      PicData: []
    };
  },
  computed: {
    ...mapGetters(["GETUserFULLDATA", "GetProfilePicUrl"])
  },
  methods: {
    ...mapActions([
      "UploadProfilePic",
      "fetchProfilePic",
      "RemoveProfilePic",
      "SaveProfileSettingDataEdit",
      "fetchUserInfo"
    ]),
    ...mapMutations(["ClearAllUserDataField"]),
    Edit() {
      this.EditFlag = true;
    },
    DiscardPass() {
      this.UpdatePassFlag = false;
    },
    async SaveNewPass() {
      if (
        this.NewPass == this.ConfirmPass &&
        this.ConfirmPass &&
        this.NewPass
      ) {
        await firebase
          .auth()
          .currentUser.updatePassword(this.NewPass)
          .then(() => {
            alert("Pass updated successfully");
            this.$router.push("/Login");
          })
          .catch(err => {
            alert(err);
            console.log("Some Error is here " + err);
          });
      } else {
        alert("Passwords don't match");
      }
    },
    UpdatePass() {
      this.UpdatePassFlag = true;
    },
    async SignOut() {
      //TODO pop up "sorry to see you leave"
      const auth = firebase.auth();
      await auth.signOut();
      this.ClearAllUserDataField();
      // alert("Passwords don't match");
      this.$router.push("/Login");
    },
    DiscardEdit() {
      this.EditFlag = false;
      //Assign Data to The Deafult Values
      this.FirstName = this.GETUserFULLDATA.FirstName;
      this.LastName = this.GETUserFULLDATA.LastName;
      this.UserBio = this.GETUserFULLDATA.UserBio;
    },
    async Save() {
      if (this.FirstName != "" && this.LastName != "" && this.UserBio != "") {
        var data = {
          FirstName: this.FirstName,
          LastName: this.LastName,
          UserBio: this.UserBio
        };
        await this.SaveProfileSettingDataEdit(data);
        this.EditFlag = false;
        this.fetchUserInfo();
      } else {
        alert("Please Fill in the Your User Profile Data");
      }
    },
    async Remove() {
      this.RemoveProfilePic();
      this.CurrentImgUrl = "";
    },
    async UploadPhoto() {
      //Upload Photo to firebase cloud storage
      var PhotoData = {
        //Object to hold the photo info
        Url: "",
        FileObject: ""
      };
      PhotoData.Url =
        "UserProfilePics/" +
        this.GETUserFULLDATA.UserId +
        "/" +
        this.PicData[0].name +
        ".jpg";
      PhotoData.FileObject = this.PicData[0];
      await this.UploadProfilePic(PhotoData);
      //TODO Progress Loading Bar
      //DONE Trigger Action to get the uploaded profile pic
      await this.fetchProfilePic();
      // this.CurrentImgUrl =  await this.GetProfilePicUrl;
      this.UpdateMyProfile = false;
    },
    async DiscardPhoto() {
      this.UpdateMyProfile = false;
      this.CurrentImgUrl = this.GetProfilePicUrl;
    },
    BrowsePhoto(e) {
      //Fetch File object and preview it before uploading
      this.PicData = e.target.files;
      let reader = new FileReader();
      reader.onload = e => {
        this.CurrentImgUrl = e.target.result;
      };
      console.log("Pic data is: ", this.PicData[0]);
      reader.readAsDataURL(this.PicData[0]);
      console.log("the Url is: " + this.CurrentImgUrl);
      this.UpdateMyProfile = true;
    },
    Update() {
      this.$refs.input1.click();
      this.UpdateMyProfile = true;
    }
  },
  mounted() {
    //Assign Data to The Deafult Values
    this.FirstName = this.GETUserFULLDATA.FirstName;
    this.LastName = this.GETUserFULLDATA.LastName;
    this.UserBio = this.GETUserFULLDATA.UserBio;
    this.CurrentImgUrl = this.GetProfilePicUrl;
  }
};
</script>

<style></style>
