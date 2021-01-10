import firebase from "firebase"

//mutations are for mutating state
//actions are for commiting mutations

    const state = {
        counter: 0,
        //All Academies 
        AllAcademies: [],
        //Enrolled Academies
        EnrolledAcademies: [],
        //ToEnroll Academies
        ToEnrollAcademies:[],
        //MyAcademies
        MyAcademies:[],
        //User ID
        UserID:null
    }
    const mutations = {
        increment(state)
        {
            state.counter++
            console.log(state.counter); 
        },
        SetCurrentUserID(state,n)
        {
            state.UserID = n
        },
        FilterAcademies(state,n)
        {
            state.EnrolledAcademies = [];
            state.ToEnrollAcademies = [];
            state.MyAcademies = [];
            // console.log("Data length from mutation: "+ n.length);
            state.AllAcademies = n;
            // var t = n.length;
            // var m; 
            console.log("The One that is making all the trouble: "+ state.UserID);
            var EnrollFlag = false;
            state.AllAcademies.forEach((doc) => {
                doc.Enrollments.forEach((docEnroll) => {
                    if(state.UserID == docEnroll)
                    {
                        state.EnrolledAcademies.push(doc)
                        EnrollFlag = true;
                    }
                    // break;
                })
                if(!EnrollFlag)
                {
                    if(state.UserID == doc.OwnerId)
                    {
                        state.MyAcademies.push(doc);
                    }
                    else
                    {
                        state.ToEnrollAcademies.push(doc);
                    }
                }
            })
            // state.dispatch('GetCurrentUserID');
            //EnrolledAcademies --> if user id is in the Enrollment ids\
            // for (let i = 0; i < t; i++) {
            //     EnrollFlag = false
            //     m = n[i].Enrollments.length
            //     for (let j = 0; j < m; j++) {
            //         if(state.UserID == state.AllAcademies[i].Enrollments[j])
            //         {
            //             state.EnrolledAcademies.push(state.AllAcademies[i])
            //             EnrollFlag = true
            //             break;
            //         }            
            //     }
            //     if(!EnrollFlag)
            //     {
            //         //Created Academies is filtered in here
            //         if(state.UserID == state.AllAcademies[i].InstructorID)
            //         {
            //             state.MyAcademies.push(state.AllAcademies[i]);
            //         }
            //         //Otherwise the Academy Doc is added to the ToEnroll Academy
            //         else
            //         {
            //             state.ToEnrollAcademies.push(state.AllAcademies[i]);
            //         }
            //     }
            }
            // MyAcademies ---> if user Id is the Instructor ID                    
        
    }
    const getters = {
        getCount(state)
        {
            return state.counter
        },
        getEnrolledAcademies: (state) => state.EnrolledAcademies,
        getToEnrollAcademies: (state) => state.ToEnrollAcademies,
        getMyAcademies: (state) => state.MyAcademies
    }
    const actions = {
        async FetchCurrentUserID({commit,state})
        {
            if(state.UserID)
            {
                //Do Nothing
            } 
            else
            {
                var user = await firebase.auth().currentUser
                commit('SetCurrentUserID',user.uid);
            }
        },
        async FetchAllAcademies({state,commit,dispatch}) //Fetch All Academies Docs
        {
            dispatch('FetchCurrentUserID');
            var Academies = state.AllAcademies
            // console.log("Academies length is: "+ Academies.length);

            if(Academies.length == 0)
            {
                console.log("Executed boom");
                var db = firebase.firestore();
                var AcRef = db.collection("Academies");
                await AcRef.get().then((query) => {
                    query.forEach(doc => {
                        Academies.push(doc.data());
                        // state.AllAcademies.push(doc.data());    
                    });
                })
                console.log("Academies Data are: "+ Academies)
                console.log("Sample of Academies data : "+ Academies[0].AcademyId);
                commit('FilterAcademies',Academies);
            }
            else
            {
                
                commit('FilterAcademies',Academies);                
            }

        },
        // test({state})
        // {
        //     state.counter++
        //     console.log(state.counter); 
        // },
        async CreateBlankAcademy({state,dispatch},n)
        {
            dispatch('FetchCurrentUserID')
            // console.log("Data from State is: "+ state.counter);
            // await state.dispatch('GetCurrentUserID'); //Get an Update on UserID
            var db = firebase.firestore();
            var AcRef = db.collection("Academies");
            var AcademyData = {
                About:"Dummy Academy For Test Purposes",
                AboutOwner:"Tester",
                AcademyId:"",
                AcademyName:"TestingAcademy",
                FacebookLink:"https://www.facebook.com",
                Image:"null",
                OwnerName:"AcademyTester",
                Phone:"0120345343",
                Price:100,
                PriceId:"",
                OwnerId:"",
                Enrollments:[]
            }
            //Create a unique ID to the Academy doc
            console.log("User ID: "+ state.UserID);
            var blank = {}
            var refID = await AcRef.add(blank);
            AcademyData.AcademyId = refID.id;

            if(n == 0) //Create a ToEnroll Academy doc
            {
                AcademyData.AcademyName = "Tester" + Math.floor(Math.random() * 100); //Create a Unique name
                AcRef.doc(refID.id).set(AcademyData);
            }
            else if(n == 1) //Create an Enrolled Academy doc
            {
                AcademyData.AcademyName = "Tester" + Math.floor(Math.random() * 100); //Create a Unique name
                // console.log("User Id is: ",state.UserID)
                AcademyData.Enrollments.push(state.UserID);
                AcRef.doc(refID.id).set(AcademyData);
            }
            else //Create MyAcademy doc 
            {
                AcademyData.AcademyName = "Tester" + Math.floor(Math.random() * 100); //Create a Unique name
                AcademyData.OwnerId = state.UserID;
                AcRef.doc(refID.id).set(AcademyData);
            }
        }
    }

export default{
        state,
        mutations,
        actions,
        getters
}