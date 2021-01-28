import firebase from "firebase"

const state = {
    TheAnalysisComments : {},
    TheAnalysisCurrentMove : {}
}

const getters = {
   // GetTheAnalysisLineForMove:(state,postid,moveNumber)=>(state.TheAnalysisComments.postid.Comments[moveNumber]),
    GetTheAnalysisLineForMove:(state)=>(state.TheAnalysisComments),

}

const mutations = {
    emtytheState:(state)=>{ state.TheAnalysisComments = {} },
    addMovesForPost: (state,{postid,moveindex,data_storage})=> {
        //console.log("mutation",postid,moveindex,JSON.stringify(data_storage))
        if(state.TheAnalysisComments[postid]===undefined){
            state.TheAnalysisComments[postid] = {}
            var x = state.TheAnalysisComments[postid]
            x[moveindex] = data_storage
        }else{
            var a =state.TheAnalysisComments[postid]
            a[moveindex] = data_storage
        }
         
    }

}

const actions = {
    async fetchPostCommentsMove({/*state,*/commit},paylod){
            commit("emtytheState")
            var postid =paylod[0]
            var moveindex = paylod[1]
            // console.log("post_id", postid , "index", moveindex )
            var base_path = await firebase.firestore().collection("Matches").doc(postid).collection("Comments").doc(moveindex)
            var data_storage = {}
            var get_base = base_path.get()
            if(get_base.empty){
                //return null in the object
                console.log("no analysis")
            }else{
                await getSubComments(base_path,[],data_storage)
                await commit("addMovesForPost",{postid,moveindex,data_storage})
                await console.log("the data",data_storage)
            }
            
        
        
        

    }

}

export default {
    state,
    getters,
    actions,
    mutations,
}

const ConvertPathArray = function(theobject,array){
    var path = theobject   ;
    for(var i in array){
        if(path[array[i]]===undefined){
            path[array[i]] = {}
        }
        path = path[array[i]]
        }
    return path
}
const getSubComments =  function(Firebase_path,data_path,main_store){
    return new Promise( resolve => {
        Firebase_path.collection("Comments").get().then(async(SubComments)=>{
            if(!SubComments.empty){
                // console.log("the query size is ", SubComments.size)
                await SubComments.forEach(async function(doc){
                    // console.log("doc in comments", doc.id)
                    var doc_id = await doc.id
                    var new_data_path = await [...data_path] //copy the main array 
                    new_data_path.push("Comments")
                    var new_firebase_path = await Firebase_path.collection("Comments").doc(doc.id)
                    var save_at = await ConvertPathArray(main_store,new_data_path)
                    save_at[doc_id] = {
                        doc_data : await doc.data(),
                        the_Firebase_path :await new_firebase_path,
                    }
                    await new_data_path.push(doc_id)
                    await getSubComments(new_firebase_path,new_data_path,main_store)
                    // await data_path.pop()
                   //add function thats add the data to the f
                   //update function 
                })
                await resolve("resolved")
            }else{
                await resolve("resolved")
                // console.log("end")
            }
        })
        
        
        
    });
    
}
