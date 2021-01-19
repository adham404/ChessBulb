import firestore from "firebase/firebase-firestore"
import Auth from "firebase/firebase-auth"
user_id =  Auth.currentUser().uid
export default function(Current_Line) {
    var widget = {}
    widget.user = function(){
        console.log(user_id)
    }
}