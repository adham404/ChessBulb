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
        //Flag for the Current Academy Ownership
        Owner:false,
        //User ID
        UserID:null,
        //Data of the wanted currently Academy
        CurrentAcademy:"",
        //Stats of My Academy
        MyAcademyStat:{
            AcademyData:{},
            Enrollments:[],
            TotalMonthlyIncome:0,
            NumberOfSubscription:"",
            Subscribers:[],
            fetched:false,
            NumberOfLiveSessions:0,
            NumberOfCourses:0
        }
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
        OwnerShipCheck(state,dispatch)
        {
            state.Owner = false
            if(state.AllAcademies.length == 0)
            {
                dispatch('FetchAllAcademies')
            }
            state.MyAcademies.forEach((child) => {
                if(state.CurrentAcademy.AcademyId == child.AcademyId)
                {
                    state.Owner = true
                }
            })
        },
        ExecuteRestStats(state)
        {
            //Number Of Subscribers
            state.MyAcademyStat.NumberOfSubscription = state.MyAcademyStat.Enrollments.length;
            //Monthly Income
            state.MyAcademyStat.Enrollments.forEach((Enroll) =>{
                console.log(Enroll.MonthlyPayment)
                state.MyAcademyStat.TotalMonthlyIncome += Enroll.Payment;
            })
            //Number Of Courses
            state.MyAcademyStat.NumberOfCourses = 20;
            state.MyAcademyStat.NumberOfLiveSessions = 20;
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
        getMyAcademies: (state) => state.MyAcademies,
        getMyAcademyStat: (state) => state.MyAcademyStat,
        getMyAcademy: (state) => state.CurrentAcademy,
        getOwner: (state) => state.Owner
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
                commit('FilterAcademies',Academies);
            }
            else
            {
                
                commit('FilterAcademies',Academies);                
            }

        },
        async FetchAcademyStats({state,dispatch,commit},id)
        {
            if(!state.MyAcademyStat.fetched)
            {
                //Get Academy Data
                if(state.AllAcademies.length == 0)
                {
                    //InCase the Page was refreshed or smth we need to get the data of MyAcademies again
                    await dispatch('FetchAllAcademies');
                }
                //Get the instructor's Academy Data 
                state.MyAcademies.forEach((doc) =>{
                    if(doc.AcademyId == id)
                    {
                        state.MyAcademyStat.AcademyData = doc;
                    }
                })
                //Get Enrollments data create another dispatch for the thing
                //Enrollment Object where each object contain UserID, DateOfEnrollment, Monthly Payment
                await dispatch('FetchEnrollments',id);
                //Fetch Subscribers Data using Enrollment array of objects
                await dispatch('FetchSubscriberData');
                //Calculate 3the rest of stats such as Total Monthly Income, Number of subscribers, NumberOfCourses and NumberOfSessions 
                await commit('ExecuteRestStats');
                //Set Academy stats flag to true
                state.MyAcademyStat.fetched = true
            }
            else
            {
                //Go Fish
            }
        },
        async FetchSpecificAcademy({state,dispatch},id)
        {
            if(state.AllAcademies.length == 0)
            {
                await dispatch("FetchAllAcademies");
            }
            await state.AllAcademies.forEach((query) => {
                if(query.AcademyId == id)
                {
                    state.CurrentAcademy = query;
                }
            })
        },
        async FetchSubscriberData({state})
        {
            var db = firebase.firestore()
            var UserDoc = db.collection("Users");
            state.MyAcademyStat.Enrollments.forEach(enroll => {
                UserDoc.doc(enroll.UserId).get().then((doc) => {
                    state.MyAcademyStat.Subscribers.push(doc.data());
                })
            })
        },
        async FetchEnrollments({state},id)
        {
            var EnrollOb = {
            }; //Enroll Object which will contain UserID, DateOfEnrollment, Monthly Payment
            var db = firebase.firestore()
            var Enroll = db.collection("AcademyEnrollments")
            await Enroll.get().then((query) => {
                query.forEach((doc) => {
                    if(doc.data().AcademyId == id)
                    {
                        console.log(EnrollOb);
                        EnrollOb.UserId = doc.data().UserId;
                        EnrollOb.Date = doc.data().DateOfEnroll;
                        EnrollOb.Payment = doc.data().MonthlyPayment;
                        state.MyAcademyStat.Enrollments.push(EnrollOb);
                        EnrollOb = {};
                    }
                })
            })

        },
        //Create Dummy Enroll Docs to See the Results of the fetch action
        async CreateDummyEnroll({state},id)
        {
            //lick me asssssss
            console.log(state.counter)
            var UserArray = ["6Xtgsamc0POMDGFe2lukjCtgbm32","7eWJWeH7mfd05f8juTL5zRCgfVw2","Li6cnI8Ds7VeFDDPuEK4s1vqd1m1","UwfJMR95YJMHWf3d88AcFd4JZHg1","hQKQ4sYZZThVHSdRFIlTq3RmUJa2","qTRp3IxElzMCz4Ub9H0JKXcU6Sx1"]
            console.log("We Recieve: ", id);            
            var EnrollData = {}
            var db = firebase.firestore()
            var EnrollDoc = db.collection("AcademyEnrollments");
            console.log("Point A");
            var Enroll = await EnrollDoc.add(EnrollData);
            console.log("Point B");
            EnrollData = {
                AcademyId:id,
                DateOfEnroll: new Date().toDateString(),
                MonthlyPayment: Math.floor(Math.random() * 90),
                UserId: UserArray[Math.floor(Math.random() * UserArray.length)],
                active:true,
                lastpyment: Enroll.id,
                subscriptionId: Enroll.id
            }
            await EnrollDoc.doc(Enroll.id).set(EnrollData);
        },
        // test({state})
        // {
            //(1)
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