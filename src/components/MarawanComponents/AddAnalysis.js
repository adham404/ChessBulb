import firebase from "firebase"

export default function(Current_Line,UserData,Text) {
    //var widget = {}
    
    //var user_id =  firebase.auth().currentUser.uid
    // var user_name =  firebase.auth().currentUser.displayName
        
    Current_Line.collection("Comments").add({
        user_id : UserData.uid,
        user_name : UserData.name,
        Photo : UserData.Photo,
        comment : Text,
        Time : firebase.firestore.Timestamp.now()
    }).then((d)=>{
        console.log("comment Posted!!",d)
    }).catch((e)=>{
        console.log("error",e)
    })
        
    
}