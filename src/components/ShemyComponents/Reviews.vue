<template>
  <div>
    <h2>Reviews and Ratings</h2>
    <div class="Reviews">
      <div v-for="n in 5" :key="n" class="SingleReview">
        <div class="UserImage">
          <img src="@/assets/ProfilePic.jpg" alt="">
        </div>
        <div class="ReviewData">
          <div class="NameDateRating">
            <div class="NameDate">
              <p style="border-right: 2px solid grey; padding-right: 5px;">
                John Smith
              </p>
              <p style="margin-left: 5px;">
                1 Jan,2050
              </p>
            </div>
            <div class="rating">
              <svg v-if="rating >= 1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 15.751 15.113">
                  <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#fff" stroke-width="1"/>
              </svg>
              <svg v-if="rating >= 2" xmlns="http://www.w3.org/2000/svg"  width="100%" height="100%" viewBox="0 0 15.751 15.113">
                  <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#fff" stroke-width="1"/>
              </svg>
              <svg v-if="rating >= 3" xmlns="http://www.w3.org/2000/svg"  width="100%" height="100%" viewBox="0 0 15.751 15.113">
                  <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#fff" stroke-width="1"/>
              </svg>
              <svg v-if="rating >= 4" xmlns="http://www.w3.org/2000/svg"  width="100%" height="100%" viewBox="0 0 15.751 15.113">
                  <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#fff" stroke-width="1"/>
              </svg>
              <svg v-if="rating >= 5" xmlns="http://www.w3.org/2000/svg"  width="100%" height="100%" viewBox="0 0 15.751 15.113">
                  <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#fff" stroke-width="1"/>
              </svg>                    
            </div>
          </div>
          <div class="Review">
            <p>
              This product is amazing once I tried it I felt as if I was
              flying and then I somehow fell when I tried it
              I became richer and more famous it was and amazing experience really
              and I don't know I will ever be able to addicted to something this way
              any sooner I really recommend
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="AddReview">
      <div class="UserImage">
        <img src="@/assets/ProfilePic.jpg" alt="">
      </div>
      <div class="ReviewBox">
        <div class="ActualReview">
          <textarea name="Review" id="" cols="55" rows="7"></textarea>
        </div>
        <div class="RatingButton">
          <div class="rating" id="Addrating">
                        <svg v-if="rating >= 1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 15.751 15.113">
                            <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#000" stroke-width="1" fill="#000"/>
                        </svg>
                        <svg v-if="rating >= 2" xmlns="http://www.w3.org/2000/svg"  width="100%" height="100%" viewBox="0 0 15.751 15.113">
                            <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#000" stroke-width="1" fill="#000"/>
                        </svg>
                        <svg v-if="rating >= 3" xmlns="http://www.w3.org/2000/svg"  width="100%" height="100%" viewBox="0 0 15.751 15.113">
                            <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#000" stroke-width="1" fill="#000"/>
                        </svg>
                        <svg v-if="rating >= 4" xmlns="http://www.w3.org/2000/svg"  width="100%" height="100%" viewBox="0 0 15.751 15.113">
                            <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#000" stroke-width="1" fill="#000"/>
                        </svg>
                        <svg v-if="rating >= 5" xmlns="http://www.w3.org/2000/svg"  width="100%" height="100%" viewBox="0 0 15.751 15.113">
                            <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#000" stroke-width="1" fill="#000"/>
                        </svg>                    
          </div>
          <button>Add Review</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data: function()
    {
      return{
        ReviewObject:"",
        Reviews:[],
        rating: 5
      }
    },
    props:["CourseID"],
    mounted()
    {
      
    },
    methods:{
     
    }
}
</script>

<style scoped>
  .RatingButton{
    width: 30%;
    /* background-color: blue; */
  }
  .ActualReview{
    width: 70%;
  }
  textarea{
    height: 100%;
    width: 10%;
    all: unset;
    color: black;
    font-size: 1rem;
    font-family: 'Raleway',sans-serif;
    padding-left: 5px;
    padding-top: 5px;
    overflow-wrap: break-word;
  }
  h2{
    font-family: 'Raleway', sans-serif;
    border-bottom: 3px solid grey;
  }
  p{
    margin: 0px;
  }
  img{
    height: 40px;
    width: 40px;
    border-radius: 30px;
  }
  .SingleReview{
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
  }
  .NameDate{
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 10px;
    font-family: 'Raleway',sans-serif;
    font-size: 1.5rem;
  }
  .rating{
    margin-left: 1rem;
    display: flex;
  }
  .rating svg{
    width: 15px;
    margin-right: 5px;
    fill: white;
    border-color: white;
  }
  .NameDateRating{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 15px;
  }
  .Review{
    padding-left: 15px;
    font-family: 'Raleway', sans-serif;
  }
  .AddReview{
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .ReviewBox{
    display: flex;
    flex-direction: row;
    background-color: white;
    width: 90%;
    height: 150px;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 10px;
  }
  .RatingButton{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 5px;
    padding-bottom: 5px;
    align-items: flex-end;
  }
  button{
		height: 35px;
		width: 150px;
		border: none;
		outline: none;
		border-radius: 1.2rem;
		font-size: 0.9rem;
		font-family: 'Raleway', sans-serif;
		background-color: #022A68;
    color: white;
    margin-right: 5px;
	}

</style>

