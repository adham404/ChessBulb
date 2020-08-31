<template>
    <div class = "Header">
        <div id="logo">
           <router-link to="/Home">
                <svg xmlns="http://www.w3.org/2000/svg" width="321" height="85" viewBox="0 0 321 85">
                    <g id="Group_53" data-name="Group 53" transform="translate(-75 -35)">
                            <path id="Icon_awesome-lightbulb" data-name="Icon awesome-lightbulb" d="M11.444,54.13a3.814,3.814,0,0,0,.639,2.108L14.119,59.3A3.811,3.811,0,0,0,17.293,61h7.352a3.811,3.811,0,0,0,3.174-1.7l2.036-3.061a3.811,3.811,0,0,0,.639-2.108l0-4.569H11.438ZM0,20.968A20.851,20.851,0,0,0,5.19,34.762a34.238,34.238,0,0,1,6.22,10.9c0,.031.008.062.013.093H30.514c0-.031.008-.061.013-.093a34.238,34.238,0,0,1,6.22-10.9A20.964,20.964,0,1,0,0,20.968Zm20.968-9.531a9.542,9.542,0,0,0-9.531,9.531,1.906,1.906,0,1,1-3.812,0A13.358,13.358,0,0,1,20.968,7.625a1.906,1.906,0,0,1,0,3.812Z" transform="translate(80.777 57.001)" fill="#1daca8"/>
                            <text id="Chessbulb" transform="translate(75 103)" fill="#fff" font-size="68" font-family="Quicksand-Regular, Quicksand"><tspan x="0" y="0">Chessbulb</tspan></text>
                    </g>
                </svg>
           </router-link>
        </div>
        <div id="links">
            <router-link to="/Home"><h3>Home</h3></router-link>
            <router-link to="/Courses"><h3>Courses</h3></router-link>
            <router-link to="/Teach"><h3>Teach</h3></router-link>
            <router-link to="/Play"><h3>Play</h3></router-link>
            <router-link to="/Academies"><h3>Academies</h3></router-link>

        </div>
    </div>
</template>

<script>
export default {};
</script>

<style  scoped>
a {
	text-decoration: none;
}
* {
	margin: 0px;
}
svg {
	width: 220px;
	margin-left: 1rem;
}
.Header {
	height: 80px;
	background-color: #00112c;
	display: flex;
	flex-direction: row;
}
#logo {
	display: flex;
	width: 55%;
	position: relative;
	align-items: center;
}
#links {
	display: flex;
	width: 45%;
	position: relative;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
}
h3 {
	font-family: Quicksand-Regular, Quicksand;
	color: white;
	font-size: 1.1rem;
	font-weight: lighter;
}
h3:hover {
	color: #1daca8;
}
</style>