<template>
  <div class="AcademyCard">
        <div id="LegoLeft" class="Shadow">
            <div id="LeftBlock">
                <img src="../../../assets/AcademyPic.jpg" alt="">
            </div>
            <div id="RightBlock">
                <div id="UpperPiece">
                    <h2>Wadi Degla Chess Academy</h2>
                    <p>24th of may 5pm</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="594" height="1" viewBox="0 0 594 1">
                     <line id="Line_14" data-name="Line 14" x2="594" transform="translate(0 0.5)" fill="none" stroke="#707070" stroke-width="1"/>
                </svg>
                <div id="LowerPiece">
                    <h4>
                        This will be a brief description of the academy and its activities things like
                        courses achievements and championships leagues if there are any and so on now I
                        am just rumbling and rumbling only to fill space in the text because I am too
                        lazy to lorem ipsum delor maxima text man this is really boring I need to start 
                        implementing the dolor ipsum maxima 
                    </h4>
                    <button id="SendRight" class="Shadow">Join</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
p{
  color: black;
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
}
.AcademyCard{
    display: flex;
    width: 70% ;
    /* background-color: white; */
    margin-left: 15%;
    margin-top: 4rem;
    height: 300px;
}
#LegoLeft{
    display: flex;
    width: 100%;
    background-color: white;
    border-radius: 1rem;
}
#LeftBlock{
    display: flex;
    width: 50%;
    /* background-color: teal; */
    border-radius: 1rem;
}
#LeftBlock img{
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-radius: 1rem;
}
#RightBlock{
    width: 50%;
}
#UpperPiece{
    display: flex;
    justify-content: space-between;
    width: 95%;
    align-items: center;
    padding-top: 10px;
}
#UpperPiece h2{
    font-family: 'Raleway', sans-serif;
    margin: 5px;
    color: black;
}
#RightBlock svg{
    width: 400px;
}
button{
    height: 30px;
    width: 100px;
    border: none;
    outline: none;
    border-radius: 1rem;
    font-size: 0.9rem;
    font-family: 'Raleway', sans-serif;
    background-color: #00112c;
    color: white;
}
#LowerPiece {
    display: flex;
    flex-direction: column;
    height: 70%;
    width: 95%;
    justify-content: space-between;
}
#LowerPiece h4{
    font-family: 'Raleway', sans-serif;
    margin: 7px;
    color: black;
}
#SendRight{
    margin-left: auto;
}
.Shadow{
    -webkit-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
    -moz-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
    box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
}
button:hover{
    cursor: pointer;
}
</style>