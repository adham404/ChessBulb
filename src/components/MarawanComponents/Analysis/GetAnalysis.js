import firebase from "firebase"
export default function(postid){
    var widget = {}
    widget.getMainline = async function(){
        var doc_data =  await firebase.firestore().collection("Matches").doc(postid).get() ; 
        return await doc_data.data()
    }
    widget.getMainlineComments = async function(){
        var all_docs = {}
        var doc_data =  await firebase.firestore().collection("Matches").doc(postid).collection("Comments").get() ; 
        await doc_data.forEach((doc)=>{
            all_docs[doc.id] = doc.data()
        })
        return await all_docs
    }
    return widget
}