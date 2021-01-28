import firebase from "firebase"

export default function(Current_Line,Text) {
    var widget = {}
    
    var user_id =  firebase.auth().currentUser.uid
    // var user_name =  firebase.auth().currentUser.displayName
        widget.add = function(){
            Current_Line.collection("Comments").doc().set({
                user_id : user_id,
                user_name : 'رجب',
                comment : Text,
                Time : firebase.firestore.Timestamp.now()
            }).then(()=>{
                console.log("comment Posted!!")
            }).catch(()=>{
                console.log("error")
            })
        }
    
    return widget
}